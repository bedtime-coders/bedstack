import { relations } from 'drizzle-orm';
import { users } from '@users/users.model';
import { favoriteArticles } from './favorite-articles.schema';
import { articles } from './articles.schema';

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
