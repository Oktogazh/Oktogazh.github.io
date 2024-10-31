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
  posts: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      date: z.string().transform((str) => {
        const s = str.split('/').reverse().join('-')
        const date = new Date(s).getTime()
        if (isNaN(date)) {
          throw new Error(`${str} is an invalid date.`)
        } else return date
      }),
      project: reference('projects'),
    }).strict(),
  })
};