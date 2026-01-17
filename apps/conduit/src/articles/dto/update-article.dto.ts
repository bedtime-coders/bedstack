import { z } from 'zod';
import { CreateArticleDto } from './create-article.dto';

export const UpdateArticleDto = z.object({
  article: CreateArticleDto.shape.article.partial(),
});

export type UpdateArticleDto = z.infer<typeof UpdateArticleDto>;
