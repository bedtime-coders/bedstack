import { t } from 'elysia';
import { ArticleFeedQueryDto } from './article-feed-query.dto';

export const ListArticlesQueryDto = t.Composite([
  ArticleFeedQueryDto,
  t.Object({
    tag: t.Optional(t.String({ minLength: 1 })),
    author: t.Optional(t.String({ minLength: 1 })),
    favorited: t.Optional(t.String({ minLength: 1 })),
  }),
]);
export type ListArticlesQueryDto = typeof ListArticlesQueryDto.static;
