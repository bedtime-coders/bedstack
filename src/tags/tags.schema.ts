import { articleTags, tags } from '@/tags/tags.model';
import { type Static, Type } from '@sinclair/typebox';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';

export const insertTagSchema = createInsertSchema(tags);
export type TagToInsert = Pick<Static<typeof insertTagSchema>, 'name'>;

export const selectTagSchema = createSelectSchema(tags);
export type Tag = Static<typeof selectTagSchema>;

export const insertArticleTagSchema = createInsertSchema(articleTags);
export type ArticleTagToInsert = Pick<
  Static<typeof insertArticleTagSchema>,
  'articleId' | 'tagName'
>;

export const selectArticleTagSchema = createSelectSchema(articleTags);
export type ArticleTag = Static<typeof selectArticleTagSchema>;

export const ListTagsResponseSchema = Type.Object({
  tags: Type.Array(Type.String()),
});
