import { t } from 'elysia';

export const CreateCommentDto = t.Object({
  comment: t.Object({
    body: t.String({ minLength: 1 }),
  }),
});
export type CreateCommentDto = typeof CreateCommentDto.static;
