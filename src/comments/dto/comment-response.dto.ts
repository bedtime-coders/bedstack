import { type Static, Type } from '@sinclair/typebox';

export const CommentResponseDto = Type.Object({
  comment: Type.Object({
    id: Type.Number(),
    body: Type.String(),
    createdAt: Type.String(),
    updatedAt: Type.String(),
    author: Type.Object({
      username: Type.String(),
      bio: Type.Union([Type.Null(), Type.String()]),
      image: Type.Union([Type.Null(), Type.String()]),
      following: Type.Boolean(),
    }),
  }),
});

export type CommentResponseDto = Static<typeof CommentResponseDto>;
