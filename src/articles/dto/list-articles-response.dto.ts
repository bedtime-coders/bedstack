import { type Static, Type } from '@sinclair/typebox';
import { ArticleResponseDto } from './article-response.dto';

export const ListArticlesResponseDto = Type.Object({
  articles: Type.Array(ArticleResponseDto),
  articlesCount: Type.Number(),
});
export type ListArticlesResponseDto = Static<typeof ListArticlesResponseDto>;
