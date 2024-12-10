---
date: 2024-12-09
title: 1. Publishing a blog using Astro, Obsidian and GitHub
category: about
---
As I had to record my university work and meetings in a logbook, and that part of this work may be either in Welsh or in English, decided to enter everything in this public blog. Here is how this website is built and how I work on it.

# Obsidian
All the content is being edited in Obsidian. So far, I have three folders in my vault: assets, categories and posts. Here is an overview of what my editing interface looks like:

![gg](../assets/obsidian.png)

The only thing that might look a bit unusual to people unfamiliar with the specifics of markdown (file format used by obsidian under the hood) the the properties in the top of the post, these are called a front matter. In the editing mode they are parse by the obsidian app, but here is what this section for this file would look like if opened by another text editor:

```
---
date: 2024-12-09
title: 1. Publishing a blog using Astro, Obsidian and GitHub
category: about
---
```

But obsidian is not the only app build on top of the markdown format, or at least, able to parse MD front matters: Astro can it too! 
Astro, yes you know it, as in, the server rendered static website framework.

And because both can parse MD so well, I decided to try publishing this obsidian vault with it.

# Introducing, Astro
