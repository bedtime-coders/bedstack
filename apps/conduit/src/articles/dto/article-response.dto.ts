import { z } from 'zod';

export const ArticleResponseDto = z.object({
  article: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    body: z.string(),
    tagList: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
    favorited: z.boolean(),
    favoritesCount: z.number(),
    author: z.object({
      username: z.string(),
      bio: z.string().nullable(),
      image: z.string().nullable(),
      following: z.boolean(),
    }),
  }),
});

export type ArticleResponseDto = z.infer<typeof ArticleResponseDto>;
