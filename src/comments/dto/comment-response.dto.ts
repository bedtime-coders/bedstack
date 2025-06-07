import { ArticleResponseDto } from '@articles/dto';
import { type Static, Type } from '@sinclair/typebox';
import { CommentAuthorDto } from './comment-author.dto';

export const CommentResponseDto = Type.Object({
  comment: Type.Object({
    id: Type.Number(),
    comment: Type.String(),
    createdAt: Type.String(),
    updatedAt: Type.String(),
    article: ArticleResponseDto,
    author: CommentAuthorDto,
  }),
});
