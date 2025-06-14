import { articles } from '@articles/articles.schema';
import { users } from '@users/users.model';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  body: text('body').notNull(),
  articleId: serial('article_id')
    .notNull()
    .references(() => articles.id, { onDelete: 'cascade' }),
  authorId: serial('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
