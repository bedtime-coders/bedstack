import { type Static, Type } from '@sinclair/typebox';

export const ArticleTagDto = Type.Object({
  id: Type.Number(),
  name: Type.String(),
});

export type ArticleTag = Static<typeof ArticleTagDto>;
