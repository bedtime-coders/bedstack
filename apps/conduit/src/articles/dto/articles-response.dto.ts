import { type } from 'arktype';
import { ArticleResponseDto } from './article-response.dto';

export const ArticlesResponseDto = type({
  articles: ArticleResponseDto.get('article').omit('body').array(),
  articlesCount: 'number',
});

export type ArticlesResponseDto = typeof ArticlesResponseDto.infer;
