import { t } from 'elysia';
import { ArticleResponseDto } from './article-response.dto';

export const ArticlesResponseDto = t.Object({
  articles: t.Array(t.Omit(ArticleResponseDto.properties.article, ['body'])),
  articlesCount: t.Number(),
});
export type ArticlesResponseDto = typeof ArticlesResponseDto.static;
