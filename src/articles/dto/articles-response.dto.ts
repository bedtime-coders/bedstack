import { type Static, Type } from '@sinclair/typebox';
import { ArticleResponseDto } from './article-response.dto';

export const ArticlesResponseDto = Type.Object({
  articles: Type.Array(ArticleResponseDto),
  articlesCount: Type.Number(),
});
export type ArticlesResponseDto = Static<typeof ArticlesResponseDto>;
