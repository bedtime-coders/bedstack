import { MAX_PAGINATION_LIMIT } from '@/constants';
import type { Profile } from '@profiles/profiles.schema';
import { type Static, Type } from '@sinclair/typebox';
import type { ArticleTag } from '@tags/tags.schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { articles, type favoriteArticles } from './articles.model';

export const insertArticleSchemaRaw = createInsertSchema(articles);
export const selectArticleSchemaRaw = createSelectSchema(articles);

export const InsertArticleSchema = Type.Object({
  article: Type.Composite([
    Type.Pick(insertArticleSchemaRaw, ['title', 'description', 'body']),
    Type.Object({ tagList: Type.Optional(Type.Array(Type.String())) }),
  ]),
});

export type ArticleToCreateData = Static<typeof InsertArticleSchema>['article'];
export type ArticleToCreate = Omit<ArticleToCreateData, 'tagList'> & {
  authorId: number;
  slug: string;
};

export const UpdateArticleSchema = Type.Object({
  article: Type.Composite([
    Type.Partial(
      Type.Pick(insertArticleSchemaRaw, ['title', 'description', 'body']),
    ),
    Type.Object({
      tagList: Type.Optional(Type.Array(Type.String())),
    }),
  ]),
});

export type ArticleToUpdateRequest = Static<
  typeof UpdateArticleSchema
>['article'];
export type ArticleToUpdate = Omit<ArticleToUpdateRequest, 'tagList'> & {
  slug: string;
};

export const ReturnedArticleSchema = Type.Composite([
  Type.Omit(selectArticleSchemaRaw, ['id', 'authorId']),
  Type.Object({
    author: Type.Object({
      username: Type.String(),
      bio: Type.String(),
      image: Type.String(),
      following: Type.Boolean(),
    }),
    favorited: Type.Boolean(),
    favoritesCount: Type.Number(),
  }),
  Type.Object({ tagList: Type.Array(Type.String()) }),
]);

export const ReturnedArticleResponseSchema = Type.Object({
  article: ReturnedArticleSchema,
});

export type ReturnedArticle = Static<typeof ReturnedArticleSchema>;
export type ReturnedArticleResponse = Static<
  typeof ReturnedArticleResponseSchema
>;

export type ArticleInDb = Omit<
  typeof articles.$inferSelect,
  'id' | 'authorId'
> & {
  author: Profile;
  favoritedBy: ArticleFavoritedBy[];
  tags: ArticleTag[];
};

export type ArticleFavoritedBy = typeof favoriteArticles.$inferSelect;

export const ArticleFeedQuerySchema = Type.Object({
  limit: Type.Optional(
    Type.Number({
      minimum: 1,
      maximum: MAX_PAGINATION_LIMIT,
      default: 20,
    }),
  ),
  offset: Type.Optional(Type.Number({ minimum: 0, default: 0 })),
});
export const ListArticlesQuerySchema = Type.Composite([
  ArticleFeedQuerySchema,
  Type.Object({
    tag: Type.Optional(Type.String()),
    author: Type.Optional(Type.String()),
    favorited: Type.Optional(Type.String()),
  }),
]);

export const ReturnedArticleListSchema = Type.Object({
  articles: Type.Array(Type.Omit(ReturnedArticleSchema, ['body'])),
  articlesCount: Type.Number(),
});

export type ReturnedArticleList = Static<typeof ReturnedArticleListSchema>;

export const DeleteArticleResponse = Type.Object({
  message: Type.String(),
  slug: Type.String(),
});
