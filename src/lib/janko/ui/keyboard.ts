/**
 * SVG rendering of the Jankó keyboard, mirroring the physical key positions
 * (same stagger), with pointer/touch playing and glissando support.
 */

import { isBlack, keyMidi, midiName, type JankoKey, type LabelMode, type NameStyle } from '../layout';

const U = 64;          // key cell size in viewBox units
const GAP = 5;
const PAD = 10;
const SVG_NS = 'http://www.w3.org/2000/svg';

export interface KeyboardRenderState {
  keys: JankoKey[];
  octave: number;
  transpose: number;
  labels: LabelMode;
  names: NameStyle;
  legends: Map<string, string>;
}

export interface KeyboardCallbacks {
  onPress(code: string, pointerId: number): void;
  onRelease(code: string, pointerId: number): void;
}

export class KeyboardView {
  private svg: SVGSVGElement;
  private keyEls = new Map<string, SVGGElement>();
  private midiEls = new Map<number, SVGGElement[]>();
  private pressCounts = new Map<string, number>();
  private litCounts = new Map<number, number>();
  private pointerKeys = new Map<number, Set<string>>();

  constructor(container: HTMLElement, private callbacks: KeyboardCallbacks) {
    this.svg = document.createElementNS(SVG_NS, 'svg');
    this.svg.classList.add('janko-board');
    this.svg.setAttribute('role', 'group');
    this.svg.setAttribute('aria-label', 'Jankó keyboard');
    this.svg.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('pointerup', (e) => this.releasePointer(e.pointerId));
    window.addEventListener('pointercancel', (e) => this.releasePointer(e.pointerId));
    container.appendChild(this.svg);
  }

  render(state: KeyboardRenderState): void {
    this.svg.textContent = '';
    this.keyEls.clear();
    this.midiEls.clear();

    const minX = Math.min(...state.keys.map((k) => k.x));
    const maxX = Math.max(...state.keys.map((k) => k.x));
    const width = (maxX - minX + 1) * U + PAD * 2;
    const height = 4 * U + PAD * 2;
    this.svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    for (const key of state.keys) {
      const midi = keyMidi(key, state.octave, state.transpose);
      const x = PAD + (key.x - minX) * U + GAP / 2; // key.x is a centre; minX-centred key starts at PAD
      const y = PAD + (3 - key.row) * U + GAP / 2;

      const group = document.createElementNS(SVG_NS, 'g');
      group.classList.add('key', isBlack(midi) ? 'ebony' : 'ivory');
      if (key.isoOnly) group.classList.add('iso-only');
      group.dataset.code = key.code;
      group.dataset.midi = String(midi);
      group.setAttribute('role', 'button');
      group.setAttribute('aria-label', midiName(midi, state.names));

      const rect = document.createElementNS(SVG_NS, 'rect');
      rect.setAttribute('x', String(x));
      rect.setAttribute('y', String(y));
      rect.setAttribute('width', String(U - GAP));
      rect.setAttribute('height', String(U - GAP));
      rect.setAttribute('rx', '9');
      group.appendChild(rect);

      if (state.labels === 'both' || state.labels === 'notes') {
        const note = document.createElementNS(SVG_NS, 'text');
        note.classList.add('note-label');
        note.setAttribute('x', String(x + (U - GAP) / 2));
        note.setAttribute('y', String(y + U - GAP - 12));
        note.setAttribute('text-anchor', 'middle');
        note.textContent = midiName(midi, state.names);
        group.appendChild(note);
      }
      if (state.labels === 'both' || state.labels === 'keys') {
        const legend = document.createElementNS(SVG_NS, 'text');
        legend.classList.add('legend-label');
        legend.setAttribute('x', String(x + 8));
        legend.setAttribute('y', String(y + 17));
        legend.textContent = state.legends.get(key.code) ?? '';
        group.appendChild(legend);
      }

      this.bindPointer(group, key.code);
      this.svg.appendChild(group);
      this.keyEls.set(key.code, group);
      const list = this.midiEls.get(midi) ?? [];
      list.push(group);
      this.midiEls.set(midi, list);
    }

    // re-apply live press/lit state after a rebuild
    for (const [code, count] of this.pressCounts) {
      if (count > 0) this.keyEls.get(code)?.classList.add('active');
    }
    for (const [midi, count] of this.litCounts) {
      if (count > 0) for (const el of this.midiEls.get(midi) ?? []) el.classList.add('lit');
    }
  }

  private bindPointer(el: SVGGElement, code: string): void {
    el.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      // Touch pointers are implicitly captured, which would block glissando —
      // release the capture so pointerenter/leave fire on neighbouring keys.
      (e.target as Element).releasePointerCapture?.(e.pointerId);
      this.pointerPress(code, e.pointerId);
    });
    el.addEventListener('pointerenter', (e) => {
      if (e.buttons > 0) this.pointerPress(code, e.pointerId);
    });
    el.addEventListener('pointerleave', (e) => {
      this.pointerRelease(code, e.pointerId);
    });
    el.addEventListener('pointerup', (e) => {
      this.pointerRelease(code, e.pointerId);
    });
  }

  private pointerPress(code: string, pointerId: number): void {
    let set = this.pointerKeys.get(pointerId);
    if (!set) { set = new Set(); this.pointerKeys.set(pointerId, set); }
    if (set.has(code)) return;
    set.add(code);
    this.callbacks.onPress(code, pointerId);
  }

  private pointerRelease(code: string, pointerId: number): void {
    const set = this.pointerKeys.get(pointerId);
    if (!set?.has(code)) return;
    set.delete(code);
    this.callbacks.onRelease(code, pointerId);
  }

  private releasePointer(pointerId: number): void {
    const set = this.pointerKeys.get(pointerId);
    if (!set) return;
    this.pointerKeys.delete(pointerId);
    for (const code of set) this.callbacks.onRelease(code, pointerId);
  }

  /** Physical press indicator (the key the finger is on). */
  setPressed(code: string, on: boolean): void {
    const count = (this.pressCounts.get(code) ?? 0) + (on ? 1 : -1);
    this.pressCounts.set(code, Math.max(0, count));
    this.keyEls.get(code)?.classList.toggle('active', count > 0);
  }

  /** Pitch indicator — lights *every* key sounding this note (shows Jankó duplicates). */
  setLit(midi: number, on: boolean): void {
    const count = (this.litCounts.get(midi) ?? 0) + (on ? 1 : -1);
    this.litCounts.set(midi, Math.max(0, count));
    for (const el of this.midiEls.get(midi) ?? []) {
      el.classList.toggle('lit', count > 0);
    }
  }

  clearAllPressed(): void {
    this.pressCounts.clear();
    this.litCounts.clear();
    for (const el of this.keyEls.values()) el.classList.remove('active', 'lit');
  }
}
