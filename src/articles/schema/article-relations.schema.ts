import { articleTags } from '@tags/tags.model';
import { users } from '@users/users.model';
import { relations } from 'drizzle-orm';
import { comments } from '../../comments/schema';
import { articles } from './articles.schema';
import { favoriteArticles } from './favorite-articles.schema';

export const articleRelations = relations(articles, ({ one, many }) => ({
  author: one(users, {
    fields: [articles.authorId],
    references: [users.id],
    relationName: 'author',
  }),
  favoritedBy: many(favoriteArticles, {
    relationName: 'favoriteArticle',
  }),
  comments: many(comments, {
    relationName: 'articleComments',
  }),
  tags: many(articleTags, {
    relationName: 'articleTags',
  }),
}));
