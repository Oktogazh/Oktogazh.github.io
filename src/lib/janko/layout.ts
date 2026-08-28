/**
 * The Jankó lattice, mapped onto a physical computer keyboard.
 *
 * A Jankó keyboard (Paul von Jankó, 1882) is an isomorphic layout:
 *  - within a row, one key to the right = +2 semitones (a whole tone);
 *  - the row above is offset by half a key and pitched one semitone apart,
 *    so a diagonal step = ±1 semitone;
 *  - therefore every chord and scale has the same shape in every key.
 *
 * A real Jankó has 5–6 rows, but only two are *distinct*: rows alternate
 * between the whole-tone scale on C and the whole-tone scale on C♯; the
 * extra rows are duplicates that give the hands somewhere comfortable to go.
 *
 * A staggered QWERTY keyboard is, geometrically, four such rows. We map by
 * KeyboardEvent.code (physical position), so AZERTY/QWERTZ/Dvorak users get
 * exactly the same geometry — which is the whole point of Jankó.
 *
 * Pitch model: each physical key has a horizontal centre `x` measured in
 * key-widths (standard ANSI/ISO stagger). Within a pair of rows, pitch is a
 * linear function of x alone: midi = anchor + 2·(x − anchorX). Row offsets
 * of ±half a key then land the in-between semitones automatically.
 *
 *  - Bottom pair (Z-row + home row): midi = 48 + 2·(x − 2.75) → KeyZ = C3.
 *  - Top pair, "extended" mode:      midi = 60 + 2·(x − 2.00) → KeyQ = C4.
 *    (a second manual, one octave up — KeyM and KeyQ are both middle C's C4)
 *  - Top pair, "classic" mode:       midi = 48 + 2·(x − 3.00),
 *    which makes rows 3/4 exact duplicates of rows 1/2 — a true 4-row Jankó.
 */

export type LayoutMode = 'extended' | 'classic';
export type NameStyle = 'letters' | 'solfege';
export type LabelMode = 'both' | 'notes' | 'keys' | 'none';

export interface JankoKey {
  /** KeyboardEvent.code — physical position, independent of locale layout */
  code: string;
  /** 0 = bottom (ZXCV…) … 3 = top (digits) */
  row: number;
  /** physical horizontal centre, in key widths */
  x: number;
  /** MIDI note at octave shift 0 / transpose 0 */
  baseMidi: number;
  /** present on ISO (European) keyboards only */
  isoOnly?: boolean;
}

type PhysKey = [code: string, x: number];

const ROW_KEYS: PhysKey[][] = [
  [
    ['IntlBackslash', 1.75], ['KeyZ', 2.75], ['KeyX', 3.75], ['KeyC', 4.75],
    ['KeyV', 5.75], ['KeyB', 6.75], ['KeyN', 7.75], ['KeyM', 8.75],
    ['Comma', 9.75], ['Period', 10.75], ['Slash', 11.75],
  ],
  [
    ['KeyA', 2.25], ['KeyS', 3.25], ['KeyD', 4.25], ['KeyF', 5.25],
    ['KeyG', 6.25], ['KeyH', 7.25], ['KeyJ', 8.25], ['KeyK', 9.25],
    ['KeyL', 10.25], ['Semicolon', 11.25], ['Quote', 12.25],
  ],
  [
    ['KeyQ', 2.0], ['KeyW', 3.0], ['KeyE', 4.0], ['KeyR', 5.0],
    ['KeyT', 6.0], ['KeyY', 7.0], ['KeyU', 8.0], ['KeyI', 9.0],
    ['KeyO', 10.0], ['KeyP', 11.0], ['BracketLeft', 12.0], ['BracketRight', 13.0],
  ],
  [
    ['Backquote', 0.5], ['Digit1', 1.5], ['Digit2', 2.5], ['Digit3', 3.5],
    ['Digit4', 4.5], ['Digit5', 5.5], ['Digit6', 6.5], ['Digit7', 7.5],
    ['Digit8', 8.5], ['Digit9', 9.5], ['Digit0', 10.5], ['Minus', 11.5],
    ['Equal', 12.5],
  ],
];

const ISO_ONLY = new Set(['IntlBackslash']);

function rowPitch(row: number, x: number, mode: LayoutMode): number {
  if (row <= 1) return Math.round(48 + 2 * (x - 2.75));
  if (mode === 'extended') return Math.round(60 + 2 * (x - 2.0));
  return Math.round(48 + 2 * (x - 3.0));
}

export function buildLayout(mode: LayoutMode): JankoKey[] {
  const keys: JankoKey[] = [];
  ROW_KEYS.forEach((rowKeys, row) => {
    for (const [code, x] of rowKeys) {
      keys.push({
        code, row, x,
        baseMidi: rowPitch(row, x, mode),
        ...(ISO_ONLY.has(code) ? { isoOnly: true } : {}),
      });
    }
  });
  return keys;
}

export const MIDI_MIN = 21; // A0
export const MIDI_MAX = 108; // C8

export function keyMidi(key: JankoKey, octave: number, transpose: number): number {
  return key.baseMidi + 12 * octave + transpose;
}

export function inRange(midi: number): boolean {
  return midi >= MIDI_MIN && midi <= MIDI_MAX;
}

export const NOTE_NAMES: Record<NameStyle, string[]> = {
  letters: ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'],
  solfege: ['Do', 'Do♯', 'Ré', 'Ré♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si'],
};

export function pcName(pc: number, style: NameStyle = 'letters'): string {
  return NOTE_NAMES[style][((pc % 12) + 12) % 12];
}

/** MIDI 60 = C4 (middle C). */
export function midiName(midi: number, style: NameStyle = 'letters'): string {
  const octave = Math.floor(midi / 12) - 1;
  return `${pcName(midi % 12, style)}${octave}`;
}

/** Would this note be a black key on a regular piano? (Jankós keep the colouring.) */
export function isBlack(midi: number): boolean {
  return [1, 3, 6, 8, 10].includes(((midi % 12) + 12) % 12);
}

/** US legends, used when the Keyboard Layout Map API is unavailable. */
export const FALLBACK_LEGENDS: Record<string, string> = {
  Backquote: '`', Minus: '-', Equal: '=',
  BracketLeft: '[', BracketRight: ']', Semicolon: ';', Quote: "'",
  Comma: ',', Period: '.', Slash: '/', IntlBackslash: '‹',
};
for (let i = 0; i <= 9; i++) FALLBACK_LEGENDS[`Digit${i}`] = String(i);
for (let i = 65; i <= 90; i++) {
  const letter = String.fromCharCode(i);
  FALLBACK_LEGENDS[`Key${letter}`] = letter;
}

/** Best-effort legends matching the user's real key caps (Chromium only). */
export async function resolveLegends(codes: string[]): Promise<Map<string, string>> {
  const legends = new Map<string, string>();
  for (const code of codes) legends.set(code, FALLBACK_LEGENDS[code] ?? '?');
  try {
    const kb = (navigator as unknown as { keyboard?: { getLayoutMap(): Promise<Map<string, string>> } }).keyboard;
    if (kb?.getLayoutMap) {
      const map = await kb.getLayoutMap();
      for (const code of codes) {
        const char = map.get(code);
        if (char) legends.set(code, char.length === 1 ? char.toUpperCase() : char);
      }
    }
  } catch {
    // fall back to US legends
  }
  return legends;
}
