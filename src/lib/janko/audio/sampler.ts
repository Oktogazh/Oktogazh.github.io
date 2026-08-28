/**
 * Sample-set loading and playback. Sample sets are optional: the app looks
 * for `samples/manifest.json` (created by `npm run fetch-samples`) and, when
 * present, upgrades matching instruments from synthesis to real recordings.
 *
 * Fetching raw bytes starts immediately at page load (no AudioContext
 * needed); decoding happens once the context exists (first user gesture).
 */

import type { InstrumentVoice } from './engine';

export interface SampleSetManifest {
  id: string;
  label: string;
  gain?: number;
  attribution?: string;
  /** note name → file name, e.g. { "Ds4": "Ds4.mp3" } */
  files: Record<string, string>;
}

export interface SamplesManifest {
  sets: SampleSetManifest[];
}

interface Zone {
  midi: number;
  buffer: AudioBuffer;
}

/** Parse note names like "C4", "Ds4", "D#4", "Bb2", "A0". MIDI 60 = C4. */
export function noteToMidi(name: string): number {
  const match = /^([A-Ga-g])([sb#♯♭]?)(-?\d+)$/.exec(name.trim());
  if (!match) throw new Error(`Bad note name: ${name}`);
  const base: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  let pc = base[match[1].toUpperCase()];
  if (match[2] === 's' || match[2] === '#' || match[2] === '♯') pc += 1;
  if (match[2] === 'b' || match[2] === '♭') pc -= 1;
  return 12 * (parseInt(match[3], 10) + 1) + pc;
}

export class SampleSet {
  constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly gain: number,
    public readonly attribution: string | undefined,
    private readonly zones: Zone[], // sorted by midi
  ) {}

  nearest(midi: number): Zone {
    let best = this.zones[0];
    for (const zone of this.zones) {
      if (Math.abs(zone.midi - midi) < Math.abs(best.midi - midi)) best = zone;
    }
    return best;
  }

  voice(ctx: AudioContext, out: AudioNode, midi: number, velocity: number, releaseTau = 0.11): InstrumentVoice {
    const zone = this.nearest(midi);
    const now = ctx.currentTime + 0.003;
    const src = ctx.createBufferSource();
    src.buffer = zone.buffer;
    src.playbackRate.value = Math.pow(2, (midi - zone.midi) / 12);

    const gain = ctx.createGain();
    const level = Math.pow(velocity, 1.6) * this.gain;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(level, now + 0.002);
    src.connect(gain).connect(out);
    src.start(now);

    return {
      tail: releaseTau * 5,
      release(when) {
        gain.gain.cancelScheduledValues(when);
        gain.gain.setTargetAtTime(0, when, releaseTau);
        src.stop(when + releaseTau * 6);
      },
      stop(when) {
        try { src.stop(when); } catch { /* not started */ }
      },
    };
  }
}

export interface PendingSampleSet {
  manifest: SampleSetManifest;
  /** note name → raw bytes (fetched, not yet decoded) */
  raw: Map<string, ArrayBuffer>;
}

/** Phase 1 — fetch manifest + raw audio bytes. Safe to call before any gesture. */
export async function fetchSampleData(baseUrl = '/janko/samples/'): Promise<PendingSampleSet[]> {
  const res = await fetch(`${baseUrl}manifest.json`);
  if (!res.ok) throw new Error(`No sample manifest (${res.status})`);
  const manifest = (await res.json()) as SamplesManifest;

  const pending: PendingSampleSet[] = [];
  for (const set of manifest.sets ?? []) {
    const raw = new Map<string, ArrayBuffer>();
    const entries = Object.entries(set.files);
    const results = await Promise.allSettled(
      entries.map(async ([note, file]) => {
        const fileRes = await fetch(`${baseUrl}${set.id}/${file}`);
        if (!fileRes.ok) throw new Error(`${file}: ${fileRes.status}`);
        raw.set(note, await fileRes.arrayBuffer());
      }),
    );
    const failed = results.filter((r) => r.status === 'rejected').length;
    if (failed > 0) console.warn(`[samples] ${set.id}: ${failed}/${entries.length} files failed to load`);
    if (raw.size >= 4) pending.push({ manifest: set, raw });
  }
  return pending;
}

/** Phase 2 — decode with a real AudioContext (call after first user gesture). */
export async function decodeSampleSet(ctx: AudioContext, pending: PendingSampleSet): Promise<SampleSet> {
  const zones: Zone[] = [];
  for (const [note, bytes] of pending.raw) {
    try {
      // decodeAudioData detaches the buffer — copy so a retry stays possible
      const buffer = await ctx.decodeAudioData(bytes.slice(0));
      zones.push({ midi: noteToMidi(note), buffer });
    } catch (err) {
      console.warn(`[samples] failed to decode ${pending.manifest.id}/${note}`, err);
    }
  }
  if (zones.length < 4) throw new Error(`Too few decodable samples for ${pending.manifest.id}`);
  zones.sort((a, b) => a.midi - b.midi);
  return new SampleSet(
    pending.manifest.id,
    pending.manifest.label,
    pending.manifest.gain ?? 1,
    pending.manifest.attribution,
    zones,
  );
}
