import { defineCollection, reference, z } from 'astro:content'
import { glob } from 'astro/loaders';

export const collections = {
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content" }),
  categories: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      id: z.number(),
    }).strict(),
  }),
  posts: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      date: z.date(),
      category: reference('categories').optional(),
    }).strict(),
  }),
  assets: defineCollection({
    type: undefined,
  }),
};