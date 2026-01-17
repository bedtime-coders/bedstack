import { z } from 'zod';

export const TagsResponseDto = z.object({
  tags: z.array(z.string()),
});

export type TagsResponseDto = z.infer<typeof TagsResponseDto>;
