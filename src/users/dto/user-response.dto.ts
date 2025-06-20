import { t } from 'elysia';

export const UserResponseDto = t.Object({
  user: t.Object({
    email: t.String(),
    token: t.String(),
    username: t.String(),
    bio: t.Union([t.String(), t.Null()]),
    image: t.Union([t.String(), t.Null()]),
  }),
});

export type UserResponseDto = typeof UserResponseDto.static;
