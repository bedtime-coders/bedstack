import { t } from 'elysia';

export const profileResponseSchema = t.Object({
  profile: t.Object({
    username: t.String(),
    bio: t.Union([t.String(), t.Null()]),
    image: t.Union([t.String(), t.Null()]),
    following: t.Boolean(),
  }),
});

export type ProfileResponseDto = typeof profileResponseSchema.static;
