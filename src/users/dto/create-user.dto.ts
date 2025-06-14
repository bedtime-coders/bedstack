import { t } from 'elysia';

export const CreateUserDto = t.Object({
  user: t.Object({
    email: t.String({
      format: 'email',
      minLength: 3,
      maxLength: 255,
      description: 'must be a valid email address',
    }),
    password: t.String({
      minLength: 8,
      maxLength: 100,
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$',
      description:
        'must be at least 8 characters and contain uppercase, lowercase, and numbers',
    }),
    username: t.String({
      minLength: 3,
      maxLength: 50,
      pattern: '^[a-zA-Z0-9_-]+$',
      description:
        'must be 3-50 characters and contain only letters, numbers, underscores, and hyphens',
    }),
    bio: t.Optional(t.String({ maxLength: 1000 })),
    image: t.Optional(t.String({ format: 'uri' })),
  }),
});

export type CreateUserDto = typeof CreateUserDto.static;
