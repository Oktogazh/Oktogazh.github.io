# oktogazh.github.io

The personal site, notebook and Zettelkasten of Alan Kersaudy — published at
**https://oktogazh.github.io**.

It is one directory doing three jobs at once:

- **An Obsidian vault.** `src/content/` is opened directly in Obsidian and used as a
  Zettelkasten: atomic notes, one dashboard note that links them together, and a
  private area that never leaves the machine.
- **An Astro site.** The same folder is an Astro content collection, so every public
  note is also a page.
- **A GitHub Pages deployment.** Pushing to `master` runs
  `.github/workflows/deploy.yml` and publishes the built site.

Notes are written in English, French, Welsh and Breton, sometimes in the same page.

The vault and the agent share one directory on purpose. Obsidian is where notes,
translations, to-do lists and prompts get written by hand — precise, spatial, unhurried.
Claude Code is where a change gets applied across ninety-eight notes at once. Each is
better at what the other is bad at.

## Layout

```
src/
├── content/            # the vault
│   ├── posts/          # notes → /posts/<slug>
│   ├── indices/main.md # the curated hub, rendered inside /blog
│   ├── assets/         # images and PDFs used by notes
│   └── prevez/         # private, gitignored, never published
├── content.config.ts   # collection schemas (strict)
├── i18n/ + locales/    # four languages of landing-page copy
├── pages/              # /, /fr /br /cy, /blog, /notes, /posts/[slug], /janko-piano
├── layouts/            # Shell.astro, BaseLayout.astro
├── components/         # SiteHead, LangSwitch, ThemeToggle, Home
├── lib/janko/          # the Jankó piano app
└── style/              # tokens.css, fonts.css, snippets/ (symlinked into the vault)
```

## Writing a note

```yaml
---
title: The title, in the note's own language
date: 2026-08-29
lang: br          # br | cy | fr | en
---
```

Those are the only frontmatter keys the schema accepts (plus an optional
`cssclasses`); anything else fails the build. Filenames are kebab-case and become the
URL slug. Link notes with markdown links — `[label](/posts/slug)`, never with a `.md`
extension, and never with Obsidian `[[wiki-links]]`, which do not render.

A new note appears on `/notes` automatically. `src/content/indices/main.md` is the
*curated* hub — add a note there only if it belongs on the front page of the notebook.

Math is KaTeX (`$…$`), diagrams are Mermaid fenced blocks, code blocks are rendered by
Expressive Code.

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | install dependencies |
| `npm run dev` | dev server on http://localhost:4321 |
| `npm run build` | `astro check` then build to `./dist/` |
| `npm run preview` | serve the built site locally |
| `node scripts/og-card.mjs` | regenerate the social share image |

Requires Node 20+ (developed on Node 22).

## Working with Claude Code

`CLAUDE.md` documents the conventions, the public/private boundary and the git policy.
`.claude/commands/` holds `/new-post`, `/link` and `/publish`.

## Stack

Astro 5 · MDX · remark-math + rehype-katex · remark-mermaidjs · astro-expressive-code ·
`@astrojs/sitemap`. No CSS framework and no UI framework: the site is static HTML with
hand-written CSS and two small scripts (a theme toggle and the filters on `/notes`).
