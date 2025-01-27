---
date: 2024-12-10
title: Publishing an Obsidian Zettelkasten with Astro
cssclasses: []
---
# Context
As I had to record my university work and meetings in a logbook, and that part of this work may be either in Welsh or in English, I decided to publish this logbook online. If the readers want to access the content in another language, they can let the in-browser translators do their jobs. As time passed, I noticed that publishing my thoughts proved to be extremely beneficial for a variety of reasons, and decided to keep track of any noteworthy thoughts going through my head. There is actually a word about this sort of note-taking, a German word to be precise, "[Zettelkasten](https://en.wikipedia.org/wiki/Zettelkasten)". Basically a personal Wikipedia in which the structure emerges based on links (references) between the notes in a bottom-to-top process. One of the best apps to create Zettelkästen is Obsidian; although it is not the only one, it is the one with the biggest community and the most mature ecosystem of plugins and snippets for personalization. But if you don't want to pay 10 usd a month to publish your vault, you need to be a little bit nifty.
This note explains how I publish my Obsidian vault using Astro and GitHub.


## Obsidian
The big difference between a physical and a digital Zettelkasten is that in a digital one, one does not need to store the notes in different boxes, this is because the indexation and link system are core features of the app the app. This is, in fact, the point of an app like Obsidian compared with other text editors.
This is why my system is organised in this way:

![.](../assets/obsidian.png)



TODO:
- explain the three directories
	- show how the vault is the "content" dir of the astro project
	- how to use a symlink to link the vault's assets to astro's own public/assets directory
- explain the file naming convention of the file (URL) and the frontmatter's purpose
- how to use LaTeX
- How to use cssclasses and snippets
- how to publish a using github actions

Before you ask, yes, the dark theme in this blog comes from this brillant "Atom" custom theme in Obsidian. Now, the only thing that might look a bit unusual to people unfamiliar with the specifics of markdown (file format used by obsidian under the hood) the the properties in the top of the post, these are called a front matter. In the editing mode they are parse by the obsidian app, but here is what this section for this file would look like if opened by another text editor:

```
---
date: 2024-12-09
title: 1. Publishing a blog using Astro, Obsidian and GitHub
---
```

But obsidian is not the only app build on top of the markdown format, or at least, able to parse MD front matters: Astro can it too! 
Astro, yes you know it, as in, the server rendered static website framework.

And because both can parse MD so well, I decided to try publishing this obsidian vault with it.

## Introducing: Astro
Astro is a framework that mixes the strength of modern frameworks with the efficiency of the good ol' server rendering. How? By building a copy of all the pages on the server before starting to serve them. Even the JS/TS of the front-end is rendered on a front-end engine in the server, unless otherwise specified, and the only thing the server has to do when recieving a request is to serve pure HTML and CSS. No need for API calls to populate the pages after they are opened by the client, even though these pages might be built in your favorite front end framework of the week.
All of the content of the website can be contained in the `./src/content/` directory in the markdown format. And you gessed it, this `/content` directory is nothing less than... my obsidian vault! 

## With GitHub
All the instructions to build an Astro website can be found in their documentation. But what you can also find in their docs is [this tutorial](https://docs.astro.build/en/guides/deploy/github/) to deploy your astro project as your GitHub website.
Follow these instructions and simply push your repo to a GitHub remote named [{your GH pseudo}.github.com](https://pages.github.com/) and let the magic GitHub Actions CI pipeline do the rest! 

## Pro tip: Type Check Your Frontmatters
As you are likely to use the data in the frontmatter of your md files. You don't want the one misconfigured frontmatter to ruin your website. That's why you should use TypeScript in combination with [Zod](https://zod.dev/). It is quite simple to do, simply create a `config.ts` file in the `/content` directory adapt this schema for your needs:

```TS
import { defineCollection, reference, z } from 'astro:content'

export const collections = {
	posts: defineCollection({
		type: 'content',
		schema: z.object({
		title: z.string(),
		date: z.date(),
		category: reference('categories'),
		}).strict(),
	})
};
```

And don't forget to run `npx astro sync`, every time you see astro telling you their is a problem with the typing of the frontmatter in a file you think is correct. That might same you a couple of time.

You're welcome!