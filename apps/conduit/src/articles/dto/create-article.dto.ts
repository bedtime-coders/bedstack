import { z } from 'zod';

export const CreateArticleDto = z.object({
  article: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    body: z.string().min(1),
    tagList: z.array(z.string().min(1)).optional(),
  }),
});

export type CreateArticleDto = z.infer<typeof CreateArticleDto>;
