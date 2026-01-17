import { z } from 'zod';
import { ArticleResponseDto } from './article-response.dto';

export const ArticlesResponseDto = z.object({
  articles: z.array(ArticleResponseDto.shape.article.omit({ body: true })),
  articlesCount: z.number(),
});

export type ArticlesResponseDto = z.infer<typeof ArticlesResponseDto>;
