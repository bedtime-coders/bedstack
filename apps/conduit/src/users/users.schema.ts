import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { articles, favoriteArticles } from '@/articles/articles.schema';

export const users = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  email: text('email').notNull().unique(),
  bio: text('bio'),
  image: text('image'),
  password: text('password').notNull(),
  username: text('username').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const userRelations = relations(users, ({ many }) => ({
  followers: many(userFollows, { relationName: 'followed' }),
  following: many(userFollows, { relationName: 'follower' }),
  publishedArticles: many(articles, { relationName: 'author' }),
  favoriteArticles: many(favoriteArticles, { relationName: 'favoritedBy' }),
}));

export const userFollows = pgTable(
  'user_follows',
  {
    followedId: integer('followed_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    followerId: integer('follower_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [primaryKey({ columns: [table.followedId, table.followerId] })],
);

export const userFollowsRelations = relations(userFollows, ({ one }) => ({
  follower: one(users, {
    fields: [userFollows.followerId],
    references: [users.id],
    relationName: 'follower',
  }),
  followed: one(users, {
    fields: [userFollows.followedId],
    references: [users.id],
    relationName: 'followed',
  }),
}));
