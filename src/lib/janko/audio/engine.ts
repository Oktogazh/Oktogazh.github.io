/**
 * Polyphonic Web Audio engine: voice lifecycle, sustain pedal, voice stealing,
 * and a shared master chain (dry bus + generated-IR reverb → compressor → volume).
 */

export interface InstrumentVoice {
  /** Begin the musical release (damper). Must schedule internal sources to stop. */
  release(when: number): void;
  /** Hard stop of every source (panic / cleanup). */
  stop(when: number): void;
  /** Seconds after release() until the voice is silent. */
  tail: number;
}

export interface Instrument {
  id: string;
  label: string;
  /** Reverb send level, 0..1 */
  wet: number;
  /** Output trim */
  gain: number;
  play(ctx: AudioContext, out: GainNode, midi: number, velocity: number): InstrumentVoice;
  /** Optional cache warm-up for a range of notes (KS instruments). */
  prepare?(ctx: AudioContext, midis: number[]): void;
}

interface ActiveVoice {
  id: string;
  midi: number;
  startedAt: number;
  out: GainNode;
  wetSend: GainNode;
  voice: InstrumentVoice;
}

const MAX_VOICES = 40;

export class Engine {
  private ctx: AudioContext | null = null;
  private dryBus!: GainNode;
  private wetBus!: GainNode;
  private master!: GainNode;
  private voices = new Map<string, ActiveVoice>();
  private sustained = new Set<ActiveVoice>();
  private sustainOn = false;
  private volume = 0.8;
  private instrument: Instrument | null = null;

  setInstrument(instrument: Instrument): void {
    this.instrument = instrument;
  }

  setVolume(v: number): void {
    this.volume = v;
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(v * v, this.ctx.currentTime, 0.03);
    }
  }

  get sustain(): boolean {
    return this.sustainOn;
  }

  /** Create/resume the AudioContext. Call from a user-gesture handler. */
  ensure(): AudioContext {
    if (!this.ctx) {
      const Ctor = window.AudioContext
        ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctor({ latencyHint: 'interactive' });
      this.ctx = ctx;

      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = -14;
      compressor.knee.value = 18;
      compressor.ratio.value = 2.5;
      compressor.attack.value = 0.004;
      compressor.release.value = 0.18;

      this.master = ctx.createGain();
      this.master.gain.value = this.volume * this.volume;

      this.dryBus = ctx.createGain();
      this.wetBus = ctx.createGain();

      const reverb = ctx.createConvolver();
      reverb.buffer = makeImpulseResponse(ctx, 1.7, 2.6);

      this.dryBus.connect(compressor);
      this.wetBus.connect(reverb);
      reverb.connect(compressor);
      compressor.connect(this.master);
      this.master.connect(ctx.destination);
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    return this.ctx;
  }

  context(): AudioContext | null {
    return this.ctx;
  }

  noteOn(id: string, midi: number, velocity: number): void {
    const instrument = this.instrument;
    if (!instrument) return;
    const ctx = this.ensure();
    if (this.voices.has(id)) this.noteOff(id);
    if (this.voices.size >= MAX_VOICES) this.steal();

    const out = ctx.createGain();
    out.gain.value = instrument.gain;
    const wetSend = ctx.createGain();
    wetSend.gain.value = instrument.wet;
    out.connect(this.dryBus);
    out.connect(wetSend);
    wetSend.connect(this.wetBus);

    const voice = instrument.play(ctx, out, midi, velocity);
    this.voices.set(id, { id, midi, startedAt: ctx.currentTime, out, wetSend, voice });
  }

  noteOff(id: string): void {
    const active = this.voices.get(id);
    if (!active) return;
    this.voices.delete(id);
    if (this.sustainOn) {
      this.sustained.add(active);
    } else {
      this.releaseVoice(active);
    }
  }

  setSustain(on: boolean): void {
    this.sustainOn = on;
    if (!on) {
      for (const voice of this.sustained) this.releaseVoice(voice);
      this.sustained.clear();
    }
  }

  /** All notes off, immediately. */
  panic(): void {
    const ctx = this.ctx;
    const all = [...this.voices.values(), ...this.sustained];
    this.voices.clear();
    this.sustained.clear();
    if (!ctx) return;
    const now = ctx.currentTime;
    for (const active of all) {
      active.out.gain.setTargetAtTime(0, now, 0.01);
      try { active.voice.stop(now + 0.06); } catch { /* already stopped */ }
      this.scheduleCleanup(active, 0.12);
    }
  }

  activeCount(): number {
    return this.voices.size + this.sustained.size;
  }

  ctxState(): string {
    return this.ctx?.state ?? 'none';
  }

  private releaseVoice(active: ActiveVoice): void {
    const ctx = this.ctx;
    if (!ctx) return;
    try { active.voice.release(ctx.currentTime); } catch { /* ignore */ }
    this.scheduleCleanup(active, active.voice.tail + 0.25);
  }

  private steal(): void {
    // Prefer pedal-sustained voices, then the oldest held one.
    let target: ActiveVoice | undefined;
    for (const voice of this.sustained) { target = voice; break; }
    if (target) {
      this.sustained.delete(target);
    } else {
      for (const voice of this.voices.values()) {
        if (!target || voice.startedAt < target.startedAt) target = voice;
      }
      if (target) this.voices.delete(target.id);
    }
    if (!target || !this.ctx) return;
    const now = this.ctx.currentTime;
    target.out.gain.setTargetAtTime(0, now, 0.02);
    try { target.voice.stop(now + 0.09); } catch { /* ignore */ }
    this.scheduleCleanup(target, 0.15);
  }

  private scheduleCleanup(active: ActiveVoice, seconds: number): void {
    window.setTimeout(() => {
      try { active.voice.stop(this.ctx?.currentTime ?? 0); } catch { /* ignore */ }
      try { active.out.disconnect(); } catch { /* ignore */ }
      try { active.wetSend.disconnect(); } catch { /* ignore */ }
    }, seconds * 1000);
  }
}

/** Procedural stereo impulse response — exponentially decaying, softening noise. */
function makeImpulseResponse(ctx: AudioContext, seconds: number, decay: number): AudioBuffer {
  const rate = ctx.sampleRate;
  const length = Math.floor(seconds * rate);
  const buffer = ctx.createBuffer(2, length, rate);
  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    let lp = 0;
    for (let i = 0; i < length; i++) {
      const t = i / length;
      // progressively darker tail: one-pole lowpass whose smoothing grows over time
      const smooth = 0.12 + 0.75 * t;
      lp += (1 - smooth) * ((Math.random() * 2 - 1) - lp);
      data[i] = lp * Math.pow(1 - t, 1.4) * Math.exp(-decay * t) * 2.2;
    }
  }
  return buffer;
}
