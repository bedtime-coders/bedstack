import { t } from 'elysia';

export const ArticleResponseDto = t.Object({
  article: t.Object({
    slug: t.String(),
    title: t.String(),
    description: t.String(),
    body: t.String(),
    tagList: t.Array(t.String()),
    createdAt: t.String(),
    updatedAt: t.String(),
    favorited: t.Boolean(),
    favoritesCount: t.Number(),
    author: t.Object({
      username: t.String(),
      bio: t.Union([t.Null(), t.String()]),
      image: t.Union([t.Null(), t.String()]),
      following: t.Boolean(),
    }),
  }),
});
export type ArticleResponseDto = typeof ArticleResponseDto.static;
