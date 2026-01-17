import { type } from 'arktype';
import { CreateArticleDto } from './create-article.dto';

export const UpdateArticleDto = type({
  article: CreateArticleDto.get('article').partial(),
});

export type UpdateArticleDto = typeof UpdateArticleDto.infer;
