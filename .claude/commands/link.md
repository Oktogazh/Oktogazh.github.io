---
description: Find and propose connections between a note and the rest of the Zettelkasten
argument-hint: [note slug or subject]
---

Strengthen the graph around: $ARGUMENTS

1. Read the target note in `src/content/posts/`. If the argument is a subject rather
   than a slug, find the closest notes first and confirm which one is meant.
2. Search the vault for related notes — `src/content/posts/`, `src/content/indices/`,
   and `src/content/prevez/` (read-only: private notes may inform the suggestion, but
   never link to them from a public note and never quote them).
   Search across languages: the same idea may live in a Breton, Welsh, French or
   English note under a different vocabulary. Search terms in each of the four
   languages when the subject warrants it.
3. Report, before editing anything:
   - **Strong links** — notes that genuinely continue or contradict the argument, with
     one sentence each on *why* they connect.
   - **Weak/keyword-only matches** — listed separately, not proposed as links.
   - **Gaps** — an idea the target leans on that has no note of its own yet, and would
     be worth writing.
4. Only after the user picks, add markdown links (`[label](/posts/slug)`) in a
   "see also" section at the end of the note, and add the reciprocal link in the other
   note when it makes sense. Never `[[wiki-links]]`.
5. Do not commit.
