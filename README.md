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

## Layout

```
src/
├── content/            # the vault
│   ├── posts/          # notes → /posts/<slug>
│   ├── indices/main.md # the hub, rendered at /blog
│   ├── assets/         # images and PDFs used by notes
│   └── prevez/         # private, gitignored, never published
├── content.config.ts   # collection schemas (strict)
├── pages/              # /, /blog, /posts/[slug], /janko-piano
├── layouts/            # BaseLayout.astro — article chrome
├── components/         # HomePage.svelte and friends
├── lib/janko/          # the Jankó piano app
└── style/snippets/     # CSS shared with Obsidian
```

## Writing a note

```yaml
---
title: The title, in the note's own language
date: 2026-08-29
---
```

Those are the only frontmatter keys the schema accepts (plus an optional
`cssclasses`); anything else fails the build. Filenames are kebab-case and become the
URL slug. Link notes with markdown links — `[label](/posts/slug)` — and add new notes
to `src/content/indices/main.md` so they can be found.

Math is KaTeX (`$…$`), diagrams are Mermaid fenced blocks, code blocks are rendered by
Expressive Code.

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | install dependencies |
| `npm run dev` | dev server on http://localhost:4321 |
| `npm run build` | `astro check` then build to `./dist/` |
| `npm run preview` | serve the built site locally |

Requires Node 20+ (developed on Node 22).

## Working with Claude Code

`CLAUDE.md` documents the conventions, the public/private boundary and the git policy.
`.claude/commands/` holds `/new-post`, `/link` and `/publish`.

## Stack

Astro 5 · MDX · Svelte 5 · Tailwind · remark-math + rehype-katex · remark-mermaidjs ·
astro-expressive-code
