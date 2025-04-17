import { MAX_PAGINATION_LIMIT } from '@/constants';
import type { Profile } from '@profiles/profiles.schema';
import { type Static, Type } from '@sinclair/typebox';
import type { ArticleTag } from '@tags/tags.schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { articles, type favoriteArticles } from './articles.model';

export const insertArticleSchemaRaw = createInsertSchema(articles);
export const selectArticleSchemaRaw = createSelectSchema(articles);



export type ArticleToUpdateRequest = Static<
  typeof UpdateArticleSchema
>['article'];
export type ArticleToUpdate = Omit<ArticleToUpdateRequest, 'tagList'> & {
  slug: string;
};


export type ArticleInDb = Omit<
  typeof articles.$inferSelect,
  'id' | 'authorId'
> & {
  author: Profile;
  favoritedBy: ArticleFavoritedBy[];
  tags: ArticleTag[];
};

export type ArticleFavoritedBy = typeof favoriteArticles.$inferSelect;


