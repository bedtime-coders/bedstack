import { users } from '@users/users.model';
import { relations } from 'drizzle-orm';
import { articles } from './articles.schema';
import { favoriteArticles } from './favorite-articles.schema';

export const favoriteArticleRelations = relations(
  favoriteArticles,
  ({ one }) => ({
    article: one(articles, {
      fields: [favoriteArticles.articleId],
      references: [articles.id],
      relationName: 'favoriteArticle',
    }),
    user: one(users, {
      fields: [favoriteArticles.userId],
      references: [users.id],
      relationName: 'favoritedBy',
    }),
  }),
);
