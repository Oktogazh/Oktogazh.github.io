import { defineCollection, z } from 'astro:content';

/**
 * The languages a note can be written in. Used for <html lang> (hyphenation,
 * quotation marks, screen-reader voice) and for the filter on /notes.
 *
 * It has a default so that a note added from Obsidian without the key still
 * builds; every note in the vault carries it explicitly.
 */
const noteLanguage = z.enum(['br', 'cy', 'fr', 'en', 'uk']).default('br');

export const collections = {
	indices: defineCollection({
		type: 'content',
		schema: z
			.object({
				title: z.string(),
				lang: noteLanguage,
				cssclasses: z.array(z.string()).optional(),
			})
			.strict(),
	}),
	posts: defineCollection({
		type: 'content',
		schema: z
			.object({
				title: z.string(),
				date: z.date(),
				lang: noteLanguage,
				cssclasses: z.array(z.string()).optional(),
			})
			.strict(),
	}),
	assets: defineCollection({
		type: undefined,
	}),
};
