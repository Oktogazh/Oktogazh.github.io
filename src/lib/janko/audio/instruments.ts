/**
 * The instrument roster. "Hybrid" instruments (piano, harpsichord) start as
 * synthesis and transparently upgrade to sampled playback once their sample
 * set has been fetched and decoded — so the app makes sound instantly and
 * gets prettier a second later.
 */

import type { Engine, Instrument } from './engine';
import { clavichord, ePiano, harpsichord, musicBox, organ, strings, synthPiano } from './synths';
import { decodeSampleSet, fetchSampleData, SampleSet, type PendingSampleSet } from './sampler';

export type SampleStatus = 'synth' | 'loading' | 'sampled';

export interface RosterInstrument extends Instrument {
  sampleSetId?: string;
  sampleStatus(): SampleStatus;
}

const SAMPLED_RELEASE: Record<string, number> = { salamander: 0.13, harpsichord: 0.06 };

function withSamples(base: Instrument, sampleSetId: string, sampledWet: number): RosterInstrument {
  let sampleSet: SampleSet | null = null;
  let loading = false;
  const roster: RosterInstrument = {
    ...base,
    sampleSetId,
    sampleStatus: () => (sampleSet ? 'sampled' : loading ? 'loading' : 'synth'),
    play(ctx, out, midi, velocity) {
      if (sampleSet) {
        return sampleSet.voice(ctx, out, midi, velocity, SAMPLED_RELEASE[sampleSetId] ?? 0.11);
      }
      return base.play(ctx, out, midi, velocity);
    },
  };
  attachTargets.set(sampleSetId, {
    setLoading: (v) => { loading = v; },
    attach: (set) => {
      sampleSet = set;
      loading = false;
      roster.wet = sampledWet;
      roster.gain = 1; // sample sets carry their own trim
    },
  });
  return roster;
}

const attachTargets = new Map<string, { setLoading(v: boolean): void; attach(set: SampleSet): void }>();

export function createInstruments(): RosterInstrument[] {
  const plain = (instrument: Instrument): RosterInstrument =>
    ({ ...instrument, sampleStatus: () => 'synth' });
  return [
    withSamples(synthPiano(), 'salamander', 0.18),
    withSamples(harpsichord(), 'harpsichord', 0.24),
    plain(clavichord()),
    plain(organ()),
    plain(ePiano()),
    plain(strings()),
    plain(musicBox()),
  ];
}

export interface SampleLoadResult {
  attributions: string[];
}

/**
 * Kick off sample loading. `onStatus` fires whenever an instrument's badge
 * should update. Never rejects — a missing manifest just means synth-only.
 */
export function loadSamples(
  engine: Engine,
  onStatus: () => void,
): { whenFetched: Promise<PendingSampleSet[]>; decodeInto(ctx: AudioContext): Promise<SampleLoadResult> } {
  const whenFetched = fetchSampleData().then((pending) => {
    for (const set of pending) attachTargets.get(set.manifest.id)?.setLoading(true);
    onStatus();
    return pending;
  }).catch((err) => {
    console.info('[samples] running synth-only:', err instanceof Error ? err.message : err);
    return [] as PendingSampleSet[];
  });

  let decoded: Promise<SampleLoadResult> | null = null;
  return {
    whenFetched,
    decodeInto(ctx: AudioContext): Promise<SampleLoadResult> {
      decoded ??= whenFetched.then(async (pending) => {
        const attributions: string[] = [];
        for (const set of pending) {
          try {
            const sampleSet = await decodeSampleSet(ctx, set);
            attachTargets.get(sampleSet.id)?.attach(sampleSet);
            if (sampleSet.attribution) attributions.push(sampleSet.attribution);
          } catch (err) {
            attachTargets.get(set.manifest.id)?.setLoading(false);
            console.warn('[samples]', err);
          }
          onStatus();
        }
        void engine; // engine reserved for future per-set routing
        return { attributions };
      });
      return decoded;
    },
  };
}
