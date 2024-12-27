import { defineCollection, reference, z } from 'astro:content'
import { glob } from 'astro/loaders';

export const collections = {
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content" }),
  categories: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
    }).strict(),
  }),
  indices: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      cssclasses: z.array(z.string()).optional(),
    }).strict(),
  }),
  posts: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      date: z.date(),
      cssclasses: z.array(z.string()).optional(),
      category: reference('categories').optional(),
    }).strict(),
  }),
  assets: defineCollection({
    type: undefined,
  }),
};