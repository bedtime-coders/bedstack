import { type Static, Type } from '@sinclair/typebox';
import { CommentAuthorDto } from './comment-author.dto';

export const CommentResponseDto = Type.Object({
  comment: Type.Object({
    id: Type.Number(),
    body: Type.String(),
    createdAt: Type.String(),
    updatedAt: Type.String(),
    author: CommentAuthorDto,
  }),
});

export type CommentResponseDto = Static<typeof CommentResponseDto>;
