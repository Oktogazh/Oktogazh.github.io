import { pcName, type NameStyle } from './layout';

/** Interval-set → chord quality. Intervals are semitones above the root, sorted. */
const QUALITIES: Record<string, string> = {
  '0,4,7': '',
  '0,3,7': 'm',
  '0,3,6': 'dim',
  '0,4,8': 'aug',
  '0,2,7': 'sus2',
  '0,5,7': 'sus4',
  '0,4,7,10': '7',
  '0,4,7,11': 'maj7',
  '0,3,7,10': 'm7',
  '0,3,7,11': 'm(maj7)',
  '0,3,6,10': 'm7♭5',
  '0,3,6,9': 'dim7',
  '0,4,7,9': '6',
  '0,3,7,9': 'm6',
  '0,2,4,7': 'add9',
  '0,2,3,7': 'm(add9)',
  '0,5,7,10': '7sus4',
  '0,2,4,7,10': '9',
  '0,2,4,7,11': 'maj9',
  '0,2,3,7,10': 'm9',
};

/**
 * Name the chord formed by the given MIDI notes, or null if unknown.
 * Prefers the lowest sounding note as root; otherwise reports a slash chord.
 */
export function detectChord(midis: number[], style: NameStyle = 'letters'): string | null {
  if (midis.length < 3) return null;
  const sorted = [...midis].sort((a, b) => a - b);
  const bassPc = ((sorted[0] % 12) + 12) % 12;
  const pcs = [...new Set(sorted.map((m) => ((m % 12) + 12) % 12))];
  if (pcs.length < 3) return null;

  const roots = [bassPc, ...pcs.filter((pc) => pc !== bassPc)];
  for (const root of roots) {
    const intervals = pcs.map((pc) => (pc - root + 12) % 12).sort((a, b) => a - b);
    const quality = QUALITIES[intervals.join(',')];
    if (quality === undefined) continue;
    const rootName = pcName(root, style);
    const sep = style === 'solfege' && quality ? ' ' : '';
    const slash = root === bassPc ? '' : `/${pcName(bassPc, style)}`;
    return `${rootName}${sep}${quality}${slash}`;
  }
  return null;
}
