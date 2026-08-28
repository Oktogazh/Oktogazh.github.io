import './janko.css';
import { Engine } from './audio/engine';
import { createInstruments, loadSamples, type RosterInstrument } from './audio/instruments';
import {
  buildLayout, inRange, keyMidi, midiName, resolveLegends,
  type LabelMode, type LayoutMode, type NameStyle,
} from './layout';
import { detectChord } from './chords';
import { KeyboardView } from './ui/keyboard';

/* ------------------------------------------------------------------ */
/* Settings                                                            */
/* ------------------------------------------------------------------ */

interface Settings {
  instrument: string;
  octave: number;
  transpose: number;
  mode: LayoutMode;
  labels: LabelMode;
  names: NameStyle;
  volume: number;
}

const DEFAULTS: Settings = {
  instrument: 'piano', octave: 0, transpose: 0,
  mode: 'extended', labels: 'both', names: 'letters', volume: 0.8,
};

const SETTINGS_KEY = 'janko:settings:v1';

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Settings>) };
  } catch { /* private mode etc. */ }
  return { ...DEFAULTS };
}

function saveSettings(s: Settings): void {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch { /* ignore */ }
}

/* ------------------------------------------------------------------ */
/* State                                                               */
/* ------------------------------------------------------------------ */

const settings = loadSettings();
const engine = new Engine();
const instruments = createInstruments();

let layout = buildLayout(settings.mode);
let byCode = new Map(layout.map((k) => [k.code, k]));
let legends = new Map<string, string>();

/** sourceId → midi for everything currently held (keyboard + pointers) */
const held = new Map<string, { code: string; midi: number }>();

const $ = <T extends HTMLElement>(id: string): T => document.getElementById(id) as T;

const kbContainer = $('kb');
const wakeOverlay = $('wake');
const chordDisplay = $('chordDisplay');
const sustainLamp = $('sustainLamp');

const view = new KeyboardView(kbContainer, {
  onPress: (code, pointerId) => pressKey(`ui:${pointerId}:${code}`, code, 0.85),
  onRelease: (code, pointerId) => releaseKey(`ui:${pointerId}:${code}`, code),
});

function currentInstrument(): RosterInstrument {
  return instruments.find((i) => i.id === settings.instrument) ?? instruments[0];
}

/* ------------------------------------------------------------------ */
/* Samples                                                             */
/* ------------------------------------------------------------------ */

const samples = loadSamples(engine, renderInstrumentButtons);

function ensureAudio(): void {
  const ctx = engine.ensure();
  void samples.decodeInto(ctx).then(({ attributions }) => {
    if (attributions.length > 0) {
      const text = `Samples: ${attributions.join(' · ')}`;
      $('credits').textContent = text;
      const helpCredits = document.getElementById('helpCredits');
      if (helpCredits) helpCredits.textContent = text;
    }
    warmup();
  });
}

function warmup(): void {
  const ctx = engine.context();
  const instrument = currentInstrument();
  if (!ctx || !instrument.prepare) return;
  const midis = layout
    .map((k) => keyMidi(k, settings.octave, settings.transpose))
    .filter(inRange);
  instrument.prepare(ctx, [...new Set(midis)]);
}

/* ------------------------------------------------------------------ */
/* Note on/off                                                         */
/* ------------------------------------------------------------------ */

let accent = false;

function pressKey(sourceId: string, code: string, baseVelocity: number): void {
  const key = byCode.get(code);
  if (!key || held.has(sourceId)) return;
  const midi = keyMidi(key, settings.octave, settings.transpose);
  if (!inRange(midi)) return;
  ensureAudio();
  const velocity = accent ? 1 : baseVelocity;
  engine.noteOn(sourceId, midi, velocity);
  held.set(sourceId, { code, midi });
  view.setPressed(code, true);
  view.setLit(midi, true);
  wakeOverlay.classList.add('hidden');
  updateChord();
}

function releaseKey(sourceId: string, code: string): void {
  const entry = held.get(sourceId);
  if (!entry) return;
  held.delete(sourceId);
  engine.noteOff(sourceId);
  view.setPressed(code, false);
  view.setLit(entry.midi, false);
  updateChord();
}

function releaseAll(): void {
  for (const [sourceId, entry] of [...held]) {
    held.delete(sourceId);
    engine.noteOff(sourceId);
    view.setPressed(entry.code, false);
    view.setLit(entry.midi, false);
  }
  updateChord();
}

function panic(): void {
  releaseAll();
  engine.setSustain(false);
  sustainLamp.classList.remove('on');
  engine.panic();
  view.clearAllPressed();
}

function updateChord(): void {
  const midis = [...held.values()].map((h) => h.midi);
  const chord = detectChord(midis, settings.names);
  if (chord) {
    chordDisplay.textContent = chord;
  } else if (midis.length > 0 && midis.length <= 4) {
    chordDisplay.textContent = [...new Set(midis)].sort((a, b) => a - b)
      .map((m) => midiName(m, settings.names)).join(' · ');
  } else {
    chordDisplay.textContent = '';
  }
}

/* ------------------------------------------------------------------ */
/* Computer keyboard input                                             */
/* ------------------------------------------------------------------ */

window.addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey) return; // keep browser shortcuts working

  switch (e.code) {
    case 'Space':
      e.preventDefault();
      if (!e.repeat) { ensureAudio(); engine.setSustain(true); sustainLamp.classList.add('on'); }
      return;
    case 'ArrowLeft': e.preventDefault(); if (!e.repeat) shiftOctave(-1); return;
    case 'ArrowRight': e.preventDefault(); if (!e.repeat) shiftOctave(1); return;
    case 'ArrowUp': e.preventDefault(); if (!e.repeat) cycleInstrument(-1); return;
    case 'ArrowDown': e.preventDefault(); if (!e.repeat) cycleInstrument(1); return;
    case 'Escape': e.preventDefault(); panic(); return;
    case 'ShiftLeft': case 'ShiftRight': accent = true; return;
  }
  if (!byCode.has(e.code)) return;
  e.preventDefault();
  if (e.repeat) return;
  pressKey(`kb:${e.code}`, e.code, 0.78);
});

window.addEventListener('keyup', (e) => {
  switch (e.code) {
    case 'Space':
      engine.setSustain(false);
      sustainLamp.classList.remove('on');
      return;
    case 'ShiftLeft': case 'ShiftRight': accent = false; return;
  }
  releaseKey(`kb:${e.code}`, e.code);
});

// If the window loses focus we may never get the keyup — release everything.
window.addEventListener('blur', () => { releaseAll(); engine.setSustain(false); sustainLamp.classList.remove('on'); });

/* ------------------------------------------------------------------ */
/* Controls                                                            */
/* ------------------------------------------------------------------ */

function renderBoard(): void {
  view.render({
    keys: layout,
    octave: settings.octave,
    transpose: settings.transpose,
    labels: settings.labels,
    names: settings.names,
    legends,
  });
}

function applyLayoutChange(): void {
  layout = buildLayout(settings.mode);
  byCode = new Map(layout.map((k) => [k.code, k]));
  renderBoard();
  warmup();
  saveSettings(settings);
}

function shiftOctave(delta: number): void {
  settings.octave = Math.max(-2, Math.min(2, settings.octave + delta));
  $('octValue').textContent = `Oct ${settings.octave > 0 ? '+' : ''}${settings.octave}`;
  renderBoard();
  warmup();
  saveSettings(settings);
}

function shiftTranspose(delta: number): void {
  settings.transpose = Math.max(-11, Math.min(11, settings.transpose + delta));
  $('trValue').textContent = `${settings.transpose >= 0 ? '+' : ''}${settings.transpose} st`;
  renderBoard();
  warmup();
  saveSettings(settings);
}

function selectInstrument(id: string): void {
  settings.instrument = id;
  engine.setInstrument(currentInstrument());
  renderInstrumentButtons();
  warmup();
  saveSettings(settings);
}

function cycleInstrument(delta: number): void {
  const index = instruments.findIndex((i) => i.id === settings.instrument);
  const next = (index + delta + instruments.length) % instruments.length;
  selectInstrument(instruments[next].id);
}

function renderInstrumentButtons(): void {
  const host = $('instruments');
  host.textContent = '';
  for (const instrument of instruments) {
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'radio';
    button.ariaChecked = String(instrument.id === settings.instrument);
    button.classList.toggle('selected', instrument.id === settings.instrument);
    button.textContent = instrument.label;
    const status = instrument.sampleStatus();
    if (status !== 'synth') {
      const dot = document.createElement('span');
      dot.className = `dot ${status}`;
      dot.title = status === 'sampled' ? 'Real recordings loaded' : 'Loading samples…';
      button.appendChild(dot);
    }
    button.addEventListener('click', () => { selectInstrument(instrument.id); button.blur(); });
    host.appendChild(button);
  }
}

const MODE_LABELS: Record<LayoutMode, string> = {
  extended: 'Layout: Extended', classic: 'Layout: Classic',
};
const LABEL_LABELS: Record<LabelMode, string> = {
  both: 'Labels: notes + keys', notes: 'Labels: notes', keys: 'Labels: keys', none: 'Labels: off',
};
const NAME_LABELS: Record<NameStyle, string> = {
  letters: 'C D E', solfege: 'Do Ré Mi',
};

function syncToggles(): void {
  $('modeToggle').textContent = MODE_LABELS[settings.mode];
  $('labelsToggle').textContent = LABEL_LABELS[settings.labels];
  $('namesToggle').textContent = NAME_LABELS[settings.names];
  $('octValue').textContent = `Oct ${settings.octave > 0 ? '+' : ''}${settings.octave}`;
  $('trValue').textContent = `${settings.transpose >= 0 ? '+' : ''}${settings.transpose} st`;
}

function wireControls(): void {
  $('octDown').addEventListener('click', () => shiftOctave(-1));
  $('octUp').addEventListener('click', () => shiftOctave(1));
  $('trDown').addEventListener('click', () => shiftTranspose(-1));
  $('trUp').addEventListener('click', () => shiftTranspose(1));

  $('modeToggle').addEventListener('click', () => {
    settings.mode = settings.mode === 'extended' ? 'classic' : 'extended';
    syncToggles();
    applyLayoutChange();
  });
  const LABEL_CYCLE: LabelMode[] = ['both', 'notes', 'keys', 'none'];
  $('labelsToggle').addEventListener('click', () => {
    settings.labels = LABEL_CYCLE[(LABEL_CYCLE.indexOf(settings.labels) + 1) % LABEL_CYCLE.length];
    syncToggles();
    renderBoard();
    saveSettings(settings);
  });
  $('namesToggle').addEventListener('click', () => {
    settings.names = settings.names === 'letters' ? 'solfege' : 'letters';
    syncToggles();
    renderBoard();
    saveSettings(settings);
  });

  const volume = $('volume') as HTMLInputElement;
  volume.value = String(settings.volume);
  volume.addEventListener('input', () => {
    settings.volume = Number(volume.value);
    engine.setVolume(settings.volume);
    saveSettings(settings);
  });
  volume.addEventListener('change', () => volume.blur());

  const help = document.getElementById('help') as HTMLDialogElement;
  $('helpBtn').addEventListener('click', () => help.showModal());

  // Buttons keep focus after click; blur so Space stays a sustain pedal.
  for (const button of document.querySelectorAll<HTMLButtonElement>('header button')) {
    button.addEventListener('click', () => button.blur());
  }

  wakeOverlay.addEventListener('pointerdown', () => {
    ensureAudio();
    wakeOverlay.classList.add('hidden');
  });
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */

engine.setInstrument(currentInstrument());
engine.setVolume(settings.volume);
syncToggles();
wireControls();
renderInstrumentButtons();
renderBoard();

void resolveLegends(layout.map((k) => k.code)).then((resolved) => {
  legends = resolved;
  renderBoard();
});

// Debug/testing handle (used by automated checks; harmless in production).
declare global {
  interface Window {
    __janko: {
      press(code: string): void;
      release(code: string): void;
      state(): { ctx: string; active: number; instrument: string; held: number };
    };
  }
}
window.__janko = {
  press: (code) => pressKey(`kb:${code}`, code, 0.78),
  release: (code) => releaseKey(`kb:${code}`, code),
  state: () => ({
    ctx: engine.ctxState(),
    active: engine.activeCount(),
    instrument: settings.instrument,
    held: held.size,
  }),
};
