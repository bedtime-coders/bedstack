import { t } from 'elysia';

// TODO: instead of defining this from scratch, can we use 'CreateArticleDto'?
export const UpdateArticleDto = t.Object({
  article: t.Object({
    title: t.Optional(t.String({ minLength: 1 })),
    description: t.Optional(t.String({ minLength: 1 })),
    body: t.Optional(t.String({ minLength: 1 })),
    tagList: t.Optional(t.Array(t.String({ minLength: 1 }))),
  }),
});
export type UpdateArticleDto = typeof UpdateArticleDto.static;
