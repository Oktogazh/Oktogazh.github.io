import { defineCollection, reference, z } from 'astro:content'

export const collections = {
  projects: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      id: z.number(),
    }).strict(),
  }),
  meetings: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      date: z.string().transform((str) => {
        str.split('/').reverse().join('-')
        return new Date(str)
      }),
      project: reference('projects'),
    }).strict(),
  })
};