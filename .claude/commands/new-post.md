---
description: Create a new note in the Zettelkasten with valid frontmatter and link it from the index
argument-hint: [slug or topic, optionally the language]
---

Create a new public note in this vault. Topic/slug given by the user: $ARGUMENTS

Steps:

1. **Decide the language.** Use the language the user wrote the topic in, unless they
   said otherwise. English, French, Welsh and Breton are all normal here.
2. **Check it doesn't already exist.** List `src/content/posts/` and grep
   `src/content/indices/main.md` for a close match. If something close exists, say so
   and ask whether to extend that note instead of creating a new one.
3. **Pick a filename**: plain ASCII kebab-case, no apostrophes or accents
   (`src/content/posts/<slug>.md`). The real title, with full orthography, goes in the
   frontmatter, not the filename.
4. **Write the frontmatter — exactly these keys**, or `astro check` fails:

   ```yaml
   ---
   title: <the real title, in the note's language>
   date: <today, YYYY-MM-DD, unquoted>
   ---
   ```

   Add `cssclasses: [dashboard]` only if the note is a dashboard/index-style note.
5. **Draft the body** as one atomic idea: a short opening that states the claim, the
   development, and a closing "see also" list of markdown links to related existing
   notes (`[label](/posts/slug)`). Do not use `[[wiki-links]]` — they do not render.
   Keep Alan's voice: direct, first person, no filler.
6. **Link it from the hub.** Add one line under the right heading in
   `src/content/indices/main.md` — language sections first (Brezhoneg, Cymraeg),
   then Blogging, then Misc.
7. **Validate**: ask Alan to run `npm run build` (it cannot run from Claude's shell —
   see CLAUDE.md). Report the resulting URL (`/posts/<slug>`).

Do not commit. Tell the user what to review.
