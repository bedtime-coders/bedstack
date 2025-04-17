// drizzle-orm Article entity moved from articles.model.ts
import { relations, sql } from 'drizzle-orm';
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { articleTags } from '@/tags/tags.model';
import { users } from '@/users/users.model';
import { favoriteArticles, comments } from '../articles.model';

export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  body: text('body').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  authorId: integer('author_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
});

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
