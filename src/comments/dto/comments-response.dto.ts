import { t } from 'elysia';
import { CommentResponseDto } from './comment-response.dto';

export const CommentsResponseDto = t.Object({
  comments: t.Array(CommentResponseDto.properties.comment),
});
export type CommentsResponseDto = typeof CommentsResponseDto.static;
