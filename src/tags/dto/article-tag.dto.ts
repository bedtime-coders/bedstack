import { Type } from '@sinclair/typebox';

export const ArticleTagResponseDto = Type.Object({
  articleId: Type.Number(),
  tagName: Type.String(),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
});

export type ArticleTagResponseDto = typeof ArticleTagResponseDto;
