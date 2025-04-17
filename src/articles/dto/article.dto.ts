import { Type, Static } from '@sinclair/typebox';

// DTO for creating an article
export const CreateArticleDto = Type.Object({
  title: Type.String({ minLength: 1 }),
  description: Type.String({ minLength: 1 }),
  body: Type.String({ minLength: 1 }),
  slug: Type.String({ minLength: 1 }),
  tagList: Type.Optional(Type.Array(Type.String())),
});
export type CreateArticleDto = Static<typeof CreateArticleDto>;

// DTO for updating an article
export const UpdateArticleDto = Type.Object({
  title: Type.Optional(Type.String({ minLength: 1 })),
  description: Type.Optional(Type.String({ minLength: 1 })),
  body: Type.Optional(Type.String({ minLength: 1 })),
  tagList: Type.Optional(Type.Array(Type.String())),
});
export type UpdateArticleDto = Static<typeof UpdateArticleDto>;

// DTO for article response
export const ArticleResponseDto = Type.Object({
  slug: Type.String(),
  title: Type.String(),
  description: Type.String(),
  body: Type.String(),
  tagList: Type.Array(Type.String()),
  createdAt: Type.String(),
  updatedAt: Type.String(),
  favorited: Type.Boolean(),
  favoritesCount: Type.Number(),
  author: Type.Object({
    username: Type.String(),
    bio: Type.String(),
    image: Type.String(),
    following: Type.Boolean(),
  }),
});
export type ArticleResponseDto = Static<typeof ArticleResponseDto>;
