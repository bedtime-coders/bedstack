import { z } from 'zod';

export const CreateUserDto = z.object({
  user: z.object({
    email: z.string().email('must be a valid email address').min(3).max(255),
    password: z
      .string()
      .min(8)
      .max(100)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
        'must be at least 8 characters and contain uppercase, lowercase, and numbers',
      ),
    username: z
      .string()
      .min(3)
      .max(50)
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        'must be 3-50 characters and contain only letters, numbers, underscores, and hyphens',
      ),
    bio: z.string().max(1000).nullish(),
    image: z.string().url().nullish(),
  }),
});

export type CreateUserDto = z.infer<typeof CreateUserDto>;
