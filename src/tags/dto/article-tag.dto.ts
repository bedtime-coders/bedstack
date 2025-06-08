import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { articleTags } from '../tags.schema';

export const insertArticleTagSchema = createInsertSchema(articleTags);
export type ArticleTagToInsert = Pick<
  typeof insertArticleTagSchema,
  'articleId' | 'tagName'
>;

export const selectArticleTagSchema = createSelectSchema(articleTags);
export type ArticleTag = typeof selectArticleTagSchema;
