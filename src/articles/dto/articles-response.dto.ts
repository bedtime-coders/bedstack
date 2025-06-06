import { Type } from '@sinclair/typebox';
import { ArticleResponseDto } from './article-response.dto';

export const ArticlesResponseDto = Type.Object({
  articles: Type.Array(
    Type.Omit(ArticleResponseDto.properties.article, ['body']),
  ),
  articlesCount: Type.Number(),
});
