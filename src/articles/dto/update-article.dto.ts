import { Type, type Static } from '@sinclair/typebox';

export const UpdateArticleDto = Type.Object({
  article: Type.Object({
    title: Type.Optional(Type.String({ minLength: 1 })),
    description: Type.Optional(Type.String({ minLength: 1 })),
    body: Type.Optional(Type.String({ minLength: 1 })),
    tagList: Type.Optional(Type.Array(Type.String())),
  }),
});
export type UpdateArticleDto = Static<typeof UpdateArticleDto>;
