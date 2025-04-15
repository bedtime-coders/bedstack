import { selectUserSchemaRaw } from '@/users/users.schema';
import { comments } from '@articles/articles.model';
import { type Static, Type } from '@sinclair/typebox';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';

export const insertCommentSchemaRaw = createInsertSchema(comments);
export const selectCommentSchemaRaw = createSelectSchema(comments);

export const AddCommentSchema = Type.Object({
  comment: Type.Object({
    body: Type.String(),
  }),
});

export type CommentToCreate = Static<typeof AddCommentSchema>['comment'] & {
  authorId: number;
  articleId: number;
};

export const ReturnedCommentSchema = Type.Composite([
  Type.Omit(selectCommentSchemaRaw, ['articleId', 'authorId']),
  Type.Object({
    author: Type.Composite([
      Type.Omit(selectUserSchemaRaw, [
        'id',
        'email',
        'password',
        'createdAt',
        'updatedAt',
      ]),
      Type.Object({
        following: Type.Boolean(),
      }),
    ]),
  }),
]);

export type ReturnedComment = Static<typeof ReturnedCommentSchema>;

export const ReturnedCommentResponse = Type.Object({
  comment: ReturnedCommentSchema,
});

export const ReturnedCommentsResponse = Type.Object({
  comments: Type.Array(ReturnedCommentSchema),
});

export const DeleteCommentResponse = Type.Object({});
