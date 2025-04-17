import { integer, pgTable, primaryKey, timestamp } from 'drizzle-orm/pg-core';
import { articles } from './articles.schema';
import { users } from '@users/users.model';

export const favoriteArticles = pgTable(
  'favorite_articles',
  {
    articleId: integer('article_id')
      .references(() => articles.id, { onDelete: 'cascade' })
      .notNull(),
    userId: integer('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.articleId, table.userId] })],
);
