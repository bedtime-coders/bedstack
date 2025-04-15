import { relations, sql } from 'drizzle-orm';
import {
  date,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { users } from '@users/users.model';

export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  body: text('body').notNull(),
  tagList: text('tag_list').array().default([]).notNull(),
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
}));

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

export const comments = pgTable('comments', {
  id: serial('id').primaryKey().notNull(),
  body: text('body').notNull(),
  articleId: integer('article_id')
    .references(() => articles.id, { onDelete: 'cascade' })
    .notNull(),
  authorId: integer('author_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const commentRelations = relations(comments, ({ one }) => ({
  article: one(articles, {
    fields: [comments.articleId],
    references: [articles.id],
    relationName: 'articleComments',
  }),
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
    relationName: 'commentAuthor',
  }),
}));
