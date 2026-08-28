/**
 * Synthesized instruments. Everything here is generated at runtime — no
 * audio assets, no licensing constraints. Plucked strings (harpsichord,
 * clavichord) use Karplus–Strong synthesis rendered into cached buffers;
 * the rest are oscillator/FM patches.
 */

import type { Instrument, InstrumentVoice } from './engine';

const midiFreq = (midi: number): number => 440 * Math.pow(2, (midi - 69) / 12);

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

let noiseCache: AudioBuffer | null = null;
function noiseBuffer(ctx: AudioContext): AudioBuffer {
  if (!noiseCache || noiseCache.sampleRate !== ctx.sampleRate) {
    const length = Math.floor(ctx.sampleRate * 0.5);
    noiseCache = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = noiseCache.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  }
  return noiseCache;
}

/** Short filtered noise burst (hammer/quill/tangent transients). */
function transient(
  ctx: AudioContext, out: AudioNode, when: number,
  opts: { seconds: number; gain: number; type: BiquadFilterType; freq: number; q?: number },
): void {
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(ctx);
  src.loop = true;
  const filter = ctx.createBiquadFilter();
  filter.type = opts.type;
  filter.frequency.value = opts.freq;
  filter.Q.value = opts.q ?? 0.8;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(opts.gain, when);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + opts.seconds);
  src.connect(filter).connect(gain).connect(out);
  src.start(when);
  src.stop(when + opts.seconds + 0.02);
}

interface PluckOptions {
  seconds: number;
  t60: number;
  /** 0..1 — one-pole prefilter on the excitation noise (1 = bright/white) */
  brightness: number;
  /** pick position as a fraction of the string, 0..0.5 */
  pick: number;
  /** 0..1 — loop lowpass smoothing (higher = darker, faster HF damping) */
  damp: number;
}

/**
 * Karplus–Strong pluck rendered offline into a buffer.
 * The feedback path is: fractional delay → one-pole lowpass → per-period gain
 * chosen so the note decays to -60 dB in `t60` seconds.
 */
function pluckBuffer(ctx: AudioContext, freq: number, o: PluckOptions): AudioBuffer {
  const rate = ctx.sampleRate;
  const total = Math.max(rate * 0.1, Math.floor(o.seconds * rate));
  const buffer = ctx.createBuffer(1, total, rate);
  const data = buffer.getChannelData(0);
  const period = rate / freq;

  // Excitation: one period of pre-filtered noise…
  const initLen = Math.min(total, Math.max(4, Math.ceil(period)));
  let lp = 0;
  for (let n = 0; n < initLen; n++) {
    lp += o.brightness * ((Math.random() * 2 - 1) - lp);
    data[n] = lp;
  }
  // …with a comb notch at the pick position.
  const combDelay = Math.max(1, Math.round(period * o.pick));
  for (let n = combDelay; n < initLen; n++) data[n] -= 0.9 * data[n - combDelay];

  const gainPerPeriod = Math.pow(10, -3 / (o.t60 * freq));
  const whole = Math.floor(period);
  const frac = period - whole;
  let loopLp = 0;
  for (let n = initLen; n < total; n++) {
    const a = data[n - whole];
    const b = n - whole - 1 >= 0 ? data[n - whole - 1] : a;
    const sample = a * (1 - frac) + b * frac;
    loopLp += (1 - o.damp) * (sample - loopLp);
    data[n] = loopLp * gainPerPeriod;
  }
  return buffer;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

/** Simple envelope-controlled gain into `out`; returns the gain node. */
function vca(ctx: AudioContext, out: AudioNode): GainNode {
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(out);
  return gain;
}

/* ------------------------------------------------------------------ */
/* Karplus–Strong instruments: harpsichord & clavichord                */
/* ------------------------------------------------------------------ */

interface KsCharacter {
  options(midi: number): PluckOptions;
  level(midi: number, velocity: number): number;
  /** extra rank an octave up (harpsichord 4′ stop), 0 = none */
  octaveRank: number;
  attack(ctx: AudioContext, out: AudioNode, when: number, velocity: number): void;
  releaseThud?: { gain: number; freq: number };
  /** ± cents of per-note random detune */
  wobble: number;
  releaseSeconds: number;
}

function ksInstrument(base: Omit<Instrument, 'play' | 'prepare'>, character: KsCharacter): Instrument {
  const cache = new Map<string, AudioBuffer>();
  const bufferFor = (ctx: AudioContext, midi: number): AudioBuffer => {
    const key = `${midi}@${ctx.sampleRate}`;
    let buffer = cache.get(key);
    if (!buffer) {
      buffer = pluckBuffer(ctx, midiFreq(midi), character.options(midi));
      cache.set(key, buffer);
    }
    return buffer;
  };

  return {
    ...base,
    prepare(ctx, midis) {
      const queue = midis.filter((m) => !cache.has(`${m}@${ctx.sampleRate}`));
      const step = (): void => {
        for (let i = 0; i < 4 && queue.length > 0; i++) bufferFor(ctx, queue.shift()!);
        if (queue.length > 0) window.setTimeout(step, 30);
      };
      step();
    },
    play(ctx, out, midi, velocity) {
      const now = ctx.currentTime + 0.003;
      const amp = vca(ctx, out);
      amp.gain.setValueAtTime(character.level(midi, velocity), now);

      const sources: AudioBufferSourceNode[] = [];
      const startRank = (rankMidi: number, gain: number): void => {
        if (rankMidi > 108) return;
        const src = ctx.createBufferSource();
        src.buffer = bufferFor(ctx, rankMidi);
        if (character.wobble > 0) {
          const cents = (Math.random() * 2 - 1) * character.wobble;
          src.playbackRate.value = Math.pow(2, cents / 1200);
        }
        const rankGain = ctx.createGain();
        rankGain.gain.value = gain;
        src.connect(rankGain).connect(amp);
        src.start(now);
        sources.push(src);
      };
      startRank(midi, 1);
      if (character.octaveRank > 0) startRank(midi + 12, character.octaveRank);
      character.attack(ctx, amp, now, velocity);

      return {
        tail: character.releaseSeconds + 0.15,
        release(when) {
          // dampers: quick fade + optional felt thud
          amp.gain.setTargetAtTime(0, when, character.releaseSeconds / 3);
          if (character.releaseThud) {
            transient(ctx, out, when, {
              seconds: 0.05,
              gain: character.releaseThud.gain * character.level(midi, velocity),
              type: 'lowpass',
              freq: character.releaseThud.freq,
            });
          }
          for (const src of sources) src.stop(when + character.releaseSeconds + 0.1);
        },
        stop(when) {
          for (const src of sources) { try { src.stop(when); } catch { /* not started */ } }
        },
      } satisfies InstrumentVoice;
    },
  };
}

export function harpsichord(): Instrument {
  return ksInstrument(
    { id: 'harpsichord', label: 'Harpsichord', wet: 0.22, gain: 0.5 },
    {
      options: (midi) => ({
        seconds: clamp(4.6 - (midi - 36) * 0.045, 1.2, 4.6),
        t60: clamp(3.0 * Math.pow(2, -(midi - 40) / 30), 0.8, 3.2),
        brightness: 0.97,
        pick: 0.13,
        damp: clamp(0.42 - (midi - 48) * 0.005, 0.12, 0.5),
      }),
      // plucked quills barely respond to touch — that's the instrument's charm
      level: (midi, velocity) => (0.8 + velocity * 0.2) * clamp(1.15 - (midi - 36) * 0.004, 0.7, 1.15),
      octaveRank: 0.33,
      attack: (ctx, out, when, velocity) =>
        transient(ctx, out, when, { seconds: 0.008, gain: 0.4 * velocity, type: 'highpass', freq: 2600 }),
      releaseThud: { gain: 0.16, freq: 900 },
      wobble: 2,
      releaseSeconds: 0.09,
    },
  );
}

export function clavichord(): Instrument {
  return ksInstrument(
    { id: 'clavichord', label: 'Clavichord', wet: 0.1, gain: 0.62 },
    {
      options: (midi) => ({
        seconds: clamp(2.4 - (midi - 36) * 0.02, 0.8, 2.4),
        t60: clamp(1.3 * Math.pow(2, -(midi - 48) / 32), 0.35, 1.5),
        brightness: 0.38,
        pick: 0.32,
        damp: clamp(0.6 - (midi - 48) * 0.004, 0.3, 0.65),
      }),
      // the tangent strikes the string directly, so touch matters more
      level: (_midi, velocity) => 0.35 + velocity * 0.65,
      octaveRank: 0,
      attack: (ctx, out, when, velocity) => {
        transient(ctx, out, when, { seconds: 0.012, gain: 0.5 * velocity, type: 'lowpass', freq: 700 });
        transient(ctx, out, when, { seconds: 0.006, gain: 0.18 * velocity, type: 'bandpass', freq: 3200, q: 1.5 });
      },
      releaseThud: { gain: 0.1, freq: 500 },
      wobble: 5,
      releaseSeconds: 0.05,
    },
  );
}

/* ------------------------------------------------------------------ */
/* Synth piano (fallback when the sampled grand hasn't loaded)         */
/* ------------------------------------------------------------------ */

export function synthPiano(): Instrument {
  const waves = new Map<number, PeriodicWave>();
  const waveFor = (ctx: AudioContext, midi: number): PeriodicWave => {
    const region = clamp(Math.floor((midi - 21) / 22), 0, 3);
    let wave = waves.get(region);
    if (!wave) {
      const partials = [24, 18, 12, 8][region];
      const rolloff = [1.15, 1.35, 1.6, 1.9][region];
      const real = new Float32Array(partials + 1);
      const imag = new Float32Array(partials + 1);
      for (let n = 1; n <= partials; n++) {
        // gentle notch around the 7th partial, like a real hammer strike point
        const notch = 0.25 + Math.abs(Math.sin((Math.PI * n) / 7.2)) * 0.75;
        imag[n] = Math.pow(n, -rolloff) * notch;
      }
      wave = ctx.createPeriodicWave(real, imag);
      waves.set(region, wave);
    }
    return wave;
  };

  return {
    id: 'piano', label: 'Grand Piano', wet: 0.16, gain: 0.5,
    play(ctx, out, midi, velocity) {
      const now = ctx.currentTime + 0.003;
      const freq = midiFreq(midi);
      const wave = waveFor(ctx, midi);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.value = 0.4;
      const cutoffPeak = clamp(freq * (5 + velocity * 5), 900, 11000);
      filter.frequency.setValueAtTime(cutoffPeak, now);
      filter.frequency.exponentialRampToValueAtTime(clamp(freq * 2.4, 500, 6500), now + 1.1);

      const amp = vca(ctx, filter);
      filter.connect(out);
      const peak = Math.pow(velocity, 1.4);
      const decaySeconds = clamp(7 * Math.pow(2, -(midi - 36) / 26), 1.2, 8);
      amp.gain.setValueAtTime(0, now);
      amp.gain.linearRampToValueAtTime(peak, now + 0.002);
      amp.gain.setTargetAtTime(peak * 0.16, now + 0.002, 0.26);
      amp.gain.setTargetAtTime(0, now + 0.85, decaySeconds / 6);

      const oscs: OscillatorNode[] = [];
      for (const [cents, gain] of [[0, 1], [2.5, 0.5], [-2.5, 0.5]] as const) {
        const osc = ctx.createOscillator();
        osc.setPeriodicWave(wave);
        osc.frequency.value = freq;
        osc.detune.value = cents;
        const oscGain = ctx.createGain();
        oscGain.gain.value = gain;
        osc.connect(oscGain).connect(amp);
        osc.start(now);
        oscs.push(osc);
      }
      transient(ctx, out, now, {
        seconds: 0.005, gain: 0.14 * velocity, type: 'bandpass',
        freq: clamp(freq * 3, 400, 5000), q: 0.7,
      });

      const stopAll = (when: number): void => {
        for (const osc of oscs) { try { osc.stop(when); } catch { /* ignore */ } }
      };
      return {
        tail: 0.35,
        release(when) {
          amp.gain.cancelScheduledValues(when);
          amp.gain.setTargetAtTime(0, when, 0.06);
          stopAll(when + 0.4);
        },
        stop: stopAll,
      };
    },
  };
}

/* ------------------------------------------------------------------ */
/* Organ                                                               */
/* ------------------------------------------------------------------ */

export function organ(): Instrument {
  // drawbar-ish partials: 16′, 8′, 4′, 2⅔′, 2′
  const RANKS: Array<[ratio: number, gain: number]> = [
    [0.5, 0.32], [1, 1], [2, 0.42], [3, 0.2], [4, 0.11],
  ];
  return {
    id: 'organ', label: 'Organ', wet: 0.3, gain: 0.19,
    play(ctx, out, midi, velocity) {
      const now = ctx.currentTime + 0.003;
      const freq = midiFreq(midi);
      const amp = vca(ctx, out);
      const level = 0.75 + velocity * 0.25;
      amp.gain.setValueAtTime(0, now);
      amp.gain.linearRampToValueAtTime(level, now + 0.035);

      const oscs: OscillatorNode[] = [];
      for (const [ratio, gain] of RANKS) {
        if (freq * ratio > 9000) continue;
        for (const detune of [0, 4.5]) { // second, slightly sharp set = gentle chorus
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.value = freq * ratio;
          osc.detune.value = detune;
          const oscGain = ctx.createGain();
          oscGain.gain.value = gain * (detune ? 0.32 : 1);
          osc.connect(oscGain).connect(amp);
          osc.start(now);
          oscs.push(osc);
        }
      }
      transient(ctx, out, now, { seconds: 0.05, gain: 0.05, type: 'bandpass', freq: freq * 2, q: 2 });

      const stopAll = (when: number): void => {
        for (const osc of oscs) { try { osc.stop(when); } catch { /* ignore */ } }
      };
      return {
        tail: 0.3,
        release(when) {
          amp.gain.cancelScheduledValues(when);
          amp.gain.setTargetAtTime(0, when, 0.055);
          stopAll(when + 0.35);
        },
        stop: stopAll,
      };
    },
  };
}

/* ------------------------------------------------------------------ */
/* Electric piano (2-op FM, Rhodes-flavoured)                          */
/* ------------------------------------------------------------------ */

export function ePiano(): Instrument {
  return {
    id: 'epiano', label: 'E-Piano', wet: 0.2, gain: 0.5,
    play(ctx, out, midi, velocity) {
      const now = ctx.currentTime + 0.003;
      const freq = midiFreq(midi);

      const carrier = ctx.createOscillator();
      carrier.type = 'sine';
      carrier.frequency.value = freq;

      const modulator = ctx.createOscillator();
      modulator.type = 'sine';
      modulator.frequency.value = freq;
      const modDepth = ctx.createGain();
      const startIndex = (1.3 + velocity * 2.2) * freq;
      modDepth.gain.setValueAtTime(startIndex, now);
      modDepth.gain.setTargetAtTime(0.10 * freq, now, 0.16);
      modulator.connect(modDepth).connect(carrier.frequency);

      const amp = vca(ctx, out);
      const peak = Math.pow(velocity, 1.3);
      amp.gain.setValueAtTime(0, now);
      amp.gain.linearRampToValueAtTime(peak, now + 0.0015);
      amp.gain.setTargetAtTime(peak * 0.4, now + 0.0015, 0.35);
      amp.gain.setTargetAtTime(0, now + 1.2, 2.6);
      carrier.connect(amp);

      // tine "ping"
      const tine = ctx.createOscillator();
      tine.type = 'sine';
      tine.frequency.value = Math.min(freq * 4, 9000);
      const tineGain = ctx.createGain();
      tineGain.gain.setValueAtTime(0.12 * velocity, now);
      tineGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
      tine.connect(tineGain).connect(out);

      // slow stereo-less tremolo
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 4.6;
      const lfoDepth = ctx.createGain();
      lfoDepth.gain.value = 0.16;
      lfo.connect(lfoDepth).connect(amp.gain);

      const all = [carrier, modulator, tine, lfo];
      for (const osc of all) osc.start(now);
      const stopAll = (when: number): void => {
        for (const osc of all) { try { osc.stop(when); } catch { /* ignore */ } }
      };
      return {
        tail: 0.4,
        release(when) {
          amp.gain.cancelScheduledValues(when);
          amp.gain.setTargetAtTime(0, when, 0.09);
          stopAll(when + 0.5);
        },
        stop: stopAll,
      };
    },
  };
}

/* ------------------------------------------------------------------ */
/* Strings pad                                                         */
/* ------------------------------------------------------------------ */

export function strings(): Instrument {
  return {
    id: 'strings', label: 'Strings', wet: 0.34, gain: 0.16,
    play(ctx, out, midi, velocity) {
      const now = ctx.currentTime + 0.003;
      const freq = midiFreq(midi);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = clamp(freq * 4.5, 800, 4200);
      filter.Q.value = 0.3;
      filter.connect(out);

      const amp = vca(ctx, filter);
      const level = 0.7 + velocity * 0.3;
      amp.gain.setValueAtTime(0, now);
      amp.gain.linearRampToValueAtTime(level, now + 0.28);

      const oscs: OscillatorNode[] = [];
      for (const detune of [-6, 5, -11]) {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = freq;
        osc.detune.value = detune;
        const oscGain = ctx.createGain();
        oscGain.gain.value = 0.34;
        osc.connect(oscGain).connect(amp);
        osc.start(now + Math.random() * 0.02);
        oscs.push(osc);
      }
      // delayed vibrato
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 5;
      const vibrato = ctx.createGain();
      vibrato.gain.setValueAtTime(0, now);
      vibrato.gain.linearRampToValueAtTime(5, now + 0.9);
      lfo.connect(vibrato);
      for (const osc of oscs) vibrato.connect(osc.detune);
      lfo.start(now);
      oscs.push(lfo);

      const stopAll = (when: number): void => {
        for (const osc of oscs) { try { osc.stop(when); } catch { /* ignore */ } }
      };
      return {
        tail: 0.8,
        release(when) {
          amp.gain.cancelScheduledValues(when);
          amp.gain.setTargetAtTime(0, when, 0.18);
          stopAll(when + 0.9);
        },
        stop: stopAll,
      };
    },
  };
}

/* ------------------------------------------------------------------ */
/* Music box                                                           */
/* ------------------------------------------------------------------ */

export function musicBox(): Instrument {
  return {
    id: 'musicbox', label: 'Music Box', wet: 0.38, gain: 0.5,
    play(ctx, out, midi, velocity) {
      const now = ctx.currentTime + 0.003;
      const freq = midiFreq(midi + 12); // tines ring an octave above written pitch
      const decay = clamp(2.2 * Math.pow(2, -(midi - 60) / 40), 0.8, 3);

      const amp = vca(ctx, out);
      const peak = 0.65 + velocity * 0.35;
      amp.gain.setValueAtTime(0, now);
      amp.gain.linearRampToValueAtTime(peak, now + 0.001);
      amp.gain.setTargetAtTime(0, now + 0.001, decay / 5);

      const oscs: OscillatorNode[] = [];
      // inharmonic partials, like a struck steel tine
      for (const [ratio, gain, tail] of [[1, 1, 1], [3.94, 0.2, 0.3], [9.2, 0.06, 0.12]] as const) {
        if (freq * ratio > 12000) continue;
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq * ratio;
        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(gain, now);
        oscGain.gain.setTargetAtTime(0, now, (decay * tail) / 4);
        osc.connect(oscGain).connect(amp);
        osc.start(now);
        osc.stop(now + decay + 0.5);
        oscs.push(osc);
      }

      const stopAll = (when: number): void => {
        for (const osc of oscs) { try { osc.stop(when); } catch { /* ignore */ } }
      };
      return {
        tail: decay,
        release(when) {
          // tines keep ringing after key release — just hurry the decay a little
          amp.gain.setTargetAtTime(0, when, decay / 8);
        },
        stop: stopAll,
      };
    },
  };
}
