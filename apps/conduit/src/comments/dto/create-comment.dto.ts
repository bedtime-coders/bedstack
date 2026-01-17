import { z } from 'zod';

export const CreateCommentDto = z.object({
  comment: z.object({
    body: z.string().min(1),
  }),
});
export type CreateCommentDto = z.infer<typeof CreateCommentDto>;
