import { defineCollection, reference, z } from 'astro:content'

export const collections = {
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
      category: reference('categories'),
    }).strict(),
  })
};