import { z } from 'zod';

export const profileResponseSchema = z.object({
  profile: z.object({
    username: z.string(),
    bio: z.string().nullable(),
    image: z.string().nullable(),
    following: z.boolean(),
  }),
});

export type ProfileResponseDto = z.infer<typeof profileResponseSchema>;
