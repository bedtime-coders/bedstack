import { Type } from '@sinclair/typebox';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { tags } from '../tags.schema';

export const insertTagSchema = createInsertSchema(tags);
export type TagToInsert = Pick<typeof insertTagSchema, 'name'>;

export const selectTagSchema = createSelectSchema(tags);
export type Tag = typeof selectTagSchema;

export const ListTagsResponseSchema = Type.Object({
  tags: Type.Array(Type.String()),
});
