---
description: Pre-flight check the vault, then commit (and push only if asked) to deploy
argument-hint: [optional commit message]
---

Prepare the site for publication. Suggested message: $ARGUMENTS

1. **Show the diff.** `git status --short` and `git diff --stat`. Name every file that
   would go into the commit, in plain language.
2. **Privacy check.** Confirm nothing under `src/content/prevez/` is staged or
   untracked-but-about-to-be-added, and that `.gitignore` still contains `prevez*`.
   Grep the staged diff for anything that looks lifted from a private note. Stop and
   ask if anything is doubtful.
3. **Noise check.** Exclude `src/content/.obsidian/plugins/languagetool/data.json`,
   `.DS_Store`, `dist/`, `.astro/` unless the user explicitly wants them.
4. **Frontmatter check.** For each added/modified note under `src/content/`, verify the
   frontmatter has only `title`, `date` (posts) or `title` (indices), plus optional
   `cssclasses`.
5. **Build.** `npm run build` cannot run from Claude's shell (see CLAUDE.md), so ask
   Alan to run it and paste the result. Do not commit a broken build.
6. **Orphan check.** For each new note, confirm something links to it
   (`src/content/indices/main.md` or another post).
7. **Commit** with a message in the repo style (`add:`, `fix:`, `update:`,
   `add(Scope):`). Commit only — **do not push**. Then tell the user that pushing to
   `master` is what triggers the GitHub Pages deployment, and ask whether to push.
