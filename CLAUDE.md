# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this repo is

Three things in one directory, and they must not be confused with each other:

1. **An Obsidian vault** — `src/content/` is opened directly in Obsidian. It is a
   Zettelkasten: atomic notes, an index/dashboard note that links them, and a private
   area. This is where Alan thinks.
2. **An Astro site** — the same `src/content/` is an Astro content collection. Every
   public note is a page.
3. **A GitHub Pages deployment** — pushing to `master` triggers
   `.github/workflows/deploy.yml` and publishes to https://oktogazh.github.io.

So editing a note is simultaneously editing a vault entry and editing a live web page.
Treat every change to `src/content/` as a publication act.

## Languages

Alan works in **English, French, Welsh (cy) and Breton (br)**. Notes exist in all four;
some mix them. Rules:

- **Write in the language the note is already in.** Do not silently translate, normalise
  or "correct" a note into English.
- Breton and Welsh notes are not typos. Before flagging spelling, assume the Celtic
  form is intentional.
- Filenames and slugs are usually ASCII-ish kebab-case even for Breton/Welsh titles
  (`savetein-ar-brezhoneg.md` for "Penaos saveteiñ ar brezhoneg"). The `title:` field
  carries the real orthography, diacritics included.
- Talk to Alan in French unless he switches. Write repo files (this file, commands,
  skills, README) in English.

## Public vs private

`src/content/prevez/` ("prevez" = private in Breton) is gitignored via the `prevez*`
rule in `.gitignore`. It never gets published.

- You **may read** `prevez/` for context.
- You **write into it only when Alan asks explicitly.**
- Never copy, quote or paraphrase its content into a public note, a commit message, or
  anything that ends up in `dist/`.
- Never remove the `prevez*` line from `.gitignore`, and never `git add -f` a file
  under it.

Everything else under `src/content/` is public the moment it is pushed.

## Repository map

```
src/
├── content/                 # the Obsidian vault + Astro content collections
│   ├── posts/               # ~100 notes — one .md/.mdx per note → /posts/<slug>
│   ├── indices/main.md      # the dashboard note rendered at /blog
│   ├── assets/              # images and PDFs referenced from notes
│   ├── prevez/              # PRIVATE, gitignored
│   └── .obsidian/           # Obsidian config (mostly gitignored, snippets kept)
├── content.config.ts        # collection schemas (strict!)
├── pages/
│   ├── index.astro          # landing page — renders HomePage.svelte, no BaseLayout
│   ├── blog/index.astro     # renders indices/main.md as the hub
│   ├── posts/[slug].astro   # one page per note
│   └── janko-piano.astro    # standalone app page, own chrome
├── layouts/BaseLayout.astro # article chrome: theme vars, KaTeX, nav, global styles
├── components/              # HomePage.svelte + a few .astro components
├── lib/janko/               # the Jankó piano app (TS, self-contained)
├── locales/{en,fr,br}.json  # svelte-i18n message files — currently EMPTY
└── style/snippets/          # CSS shared with Obsidian (dashboard, latex, linelength)
```

## Content contract — read before creating or editing a note

`src/content.config.ts` uses **strict** Zod schemas. An unknown frontmatter key fails
the build.

`posts` accepts exactly:

```yaml
---
title: The real title, in the note's own language
date: 2026-08-29        # a date, not a string
cssclasses:             # optional, Obsidian-compatible; "dashboard" is the known one
  - dashboard
---
```

`indices` accepts `title` and optional `cssclasses` — **no `date`**.

Obsidian likes to add keys (`tags`, `aliases`, `updated`, …). Those will break
`astro check`. If a note needs one, extend the schema in `content.config.ts` in the
same change.

### Slugs and links

The slug is the filename run through `github-slugger`: lowercased, spaces → hyphens,
apostrophes dropped, **underscores and diacritics kept**. `IVG P1.md` →
`/posts/ivg-p1`, `kreac'h.md` → `/posts/kreach`, `Coqui_TTS_XTTS.md` →
`/posts/coqui_tts_xtts`, `Notennoù war meurgorf.md` → `/posts/notennoù-war-meurgorf`
(an accented URL — rename the file if that is not wanted). Prefer new files already in
plain kebab-case so the mapping is obvious.

Link between notes with **plain markdown relative links**: `[label](posts/slug)` from
`indices/main.md`, `[label](/posts/slug)` from inside a note.

⚠️ **Obsidian `[[wiki-links]]` do not render.** `@portaljs/remark-wiki-link` is
imported in `astro.config.mjs` but never added to the plugin list, so `[[foo]]` ships
to the browser as literal brackets (see `dist/posts/geriadur.html`,
`nlp-corpus-report.html`, `nlp-lab-2.html`). Either wire the plugin up or use markdown
links — do not add new wiki-links to public notes without saying so.

Images and PDFs live in `src/content/assets/` and are referenced from a post as
`![alt](../assets/name.png)`.

Math is `remark-math` + `rehype-katex` (`$…$`, `$$…$$`), diagrams are
`remark-mermaidjs` fenced blocks, code blocks go through `astro-expressive-code`.

### Adding a public note

1. Create `src/content/posts/<kebab-slug>.md` with the frontmatter above.
2. Add a link to it under the right heading in `src/content/indices/main.md` —
   otherwise it exists but nothing points to it.
3. Ask Alan to run `npm run build` (which runs `astro check`) before committing —
   see the note below about the build not running from Claude's shell.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | dev server on http://localhost:4321 |
| `npm run build` | `astro check && astro build` → `dist/` — the real validation step |
| `npm run preview` | serve the built `dist/` |

⚠️ **The build does not run from Claude's shell.** Claude's shell on this machine is a
Linux VM, while `node_modules/` was installed on macOS, so `astro check`/`astro build`
die with `Cannot find module '@rollup/rollup-linux-arm64-gnu'`. Do **not** run
`npm install` from there to "fix" it — that would replace Alan's macOS binaries. Ask
Alan to run `npm run build` in his own terminal, or verify the change by reading the
config and schemas instead.

Node 22, npm 10. The site config lives in `astro.config.mjs`: `build.format: 'file'`
(pages are `/posts/foo.html` served as `/posts/foo`), `trailingSlash: 'never'`.

## Git and deployment

- **Edit freely. Commit only when Alan asks. Never push on your own** — a push to
  `master` is a deployment.
- **Claude's shell cannot push, and has no git identity.** It runs in an isolated Linux
  VM with no GitHub credentials, no `gh`, no SSH key and no keychain access. Commit
  with `git -c user.name="Alan Kersaudy" -c user.email="alan.kersaudy@gmail.com"`, then
  ask Alan to run `git push` in his own terminal.
- **Deletion is disabled in the mounted folder by default, and that breaks git**: it
  cannot remove `.git/index.lock`, so the next git write fails with
  `Unable to create '.git/index.lock': File exists`. Request delete permission for the
  repo root, then `rm -f .git/index.lock`.
- When asked to commit: run `npm run build` first, stage only the files relevant to the
  change, and write a message in the repo's existing style (`add:`, `fix:`, `update:`,
  `restore:`, sometimes scoped like `add(HomePage):`).
- `src/content/.obsidian/plugins/languagetool/data.json` changes on its own whenever
  Obsidian runs. Leave it out of commits unless Alan asks for it.
- Never commit anything under `prevez/`, `dist/`, `.astro/`, or `.DS_Store`.

## Known rough edges (don't "fix" them by surprise)

- `src/locales/*.json` are empty `{}` and `svelte-i18n` is wired into
  `HomePage.svelte` — the landing page is not actually translated yet.
- `pages/index.astro` and `pages/janko-piano.astro` deliberately bypass `BaseLayout`;
  the piano page documents why in a comment. Don't "unify" them.
- The `/blog` intro text still says Alan is *currently* doing the Bangor MSc
  (2024-25 — finished). Flag it rather than rewriting it unprompted.
- `content.config.ts` has a stray top-level `loader:` key outside any collection.
  It's inert; leave it unless you're deliberately migrating to the glob loader API.
- Some post titles are placeholders (`consent-form.md` has `title: ee`).

## Working style

- This is a thinking space, not a product. When helping with a note, prefer sharpening
  Alan's argument over rewriting his prose. Keep his voice.
- Zettelkasten discipline: one idea per note, an explicit title, and links out to
  related notes. When a note grows two subjects, suggest splitting it.
- Before a broad edit across the vault, say what you are about to touch. 100 notes are
  easy to mangle in one `sed`.
- Read `src/content/indices/main.md` when you need the map of what exists.
