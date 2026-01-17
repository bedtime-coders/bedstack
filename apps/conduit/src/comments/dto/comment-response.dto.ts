import { type } from 'arktype';

export const CommentResponseDto = type({
  comment: {
    id: 'number',
    body: 'string',
    createdAt: 'string',
    updatedAt: 'string',
    author: {
      username: 'string',
      'bio?': 'string | null',
      'image?': 'string | null',
      following: 'boolean',
    },
  },
});

export type CommentResponseDto = typeof CommentResponseDto.infer;
