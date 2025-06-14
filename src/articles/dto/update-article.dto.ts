import { t } from 'elysia';
import { CreateArticleDto } from './create-article.dto';

export const UpdateArticleDto = t.Object({
  article: t.Partial(CreateArticleDto.properties.article),
});
export type UpdateArticleDto = typeof UpdateArticleDto.static;
