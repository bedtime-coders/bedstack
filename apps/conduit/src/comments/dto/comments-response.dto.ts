import { z } from 'zod';
import { CommentResponseDto } from './comment-response.dto';

export const CommentsResponseDto = z.object({
  comments: z.array(CommentResponseDto.shape.comment),
});
export type CommentsResponseDto = z.infer<typeof CommentsResponseDto>;
