import { z } from 'zod';

export const LoginUserDto = z.object({
  user: z.object({
    email: z.string().email('must be a valid email address').min(3).max(255),
    password: z.string(),
  }),
});

export type LoginUserDto = z.infer<typeof LoginUserDto>;
