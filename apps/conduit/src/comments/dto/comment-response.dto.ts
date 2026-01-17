import { z } from 'zod';

export const CommentResponseDto = z.object({
  comment: z.object({
    id: z.number(),
    body: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    author: z.object({
      username: z.string(),
      bio: z.string().nullable(),
      image: z.string().nullable(),
      following: z.boolean(),
    }),
  }),
});

export type CommentResponseDto = z.infer<typeof CommentResponseDto>;
