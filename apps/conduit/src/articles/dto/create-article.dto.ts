import { t } from 'elysia';

export const CreateArticleDto = t.Object({
  article: t.Object({
    title: t.String({ minLength: 1 }),
    description: t.String({ minLength: 1 }),
    body: t.String({ minLength: 1 }),
    tagList: t.Optional(t.Array(t.String({ minLength: 1 }))),
  }),
});
export type CreateArticleDto = typeof CreateArticleDto.static;
