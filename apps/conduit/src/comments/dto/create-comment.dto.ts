import { type } from 'arktype';

export const CreateCommentDto = type({
  comment: {
    body: 'string > 0',
  },
});

export type CreateCommentDto = typeof CreateCommentDto.infer;
