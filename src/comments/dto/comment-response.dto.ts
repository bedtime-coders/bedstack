import { t } from 'elysia';

export const CommentResponseDto = t.Object({
  comment: t.Object({
    id: t.Number(),
    body: t.String(),
    createdAt: t.String(),
    updatedAt: t.String(),
    author: t.Object({
      username: t.String(),
      bio: t.Union([t.Null(), t.String()]),
      image: t.Union([t.Null(), t.String()]),
      following: t.Boolean(),
    }),
  }),
});

export type CommentResponseDto = typeof CommentResponseDto.static;
