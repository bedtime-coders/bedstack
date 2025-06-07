import { Type } from '@sinclair/typebox';

export const CommentAuthorDto = Type.Object({
  username: Type.String(),
  bio: Type.String(),
  image: Type.String(),
  following: Type.Boolean(),
});
