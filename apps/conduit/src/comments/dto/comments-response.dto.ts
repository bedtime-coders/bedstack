import { type } from 'arktype';
import { CommentResponseDto } from './comment-response.dto';

export const CommentsResponseDto = type({
  comments: CommentResponseDto.get('comment').array(),
});

export type CommentsResponseDto = typeof CommentsResponseDto.infer;
