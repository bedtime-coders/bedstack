import { t } from 'elysia';

export const LoginUserDto = t.Object({
  user: t.Object({
    email: t.String({
      format: 'email',
      minLength: 3,
      maxLength: 255,
      description: 'must be a valid email address',
    }),
    password: t.String(),
  }),
});

export type LoginUserDto = typeof LoginUserDto.static;
