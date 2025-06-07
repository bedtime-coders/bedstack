import { type Static, Type } from '@sinclair/typebox';
import { ArticleFeedQueryDto } from './article-feed-query.dto';

export const ListArticlesQueryDto = Type.Composite([
  ArticleFeedQueryDto,
  Type.Object({
    tag: Type.Optional(Type.String({ minLength: 1 })),
    author: Type.Optional(Type.String({ minLength: 1 })),
    favorited: Type.Optional(Type.String({ minLength: 1 })),
  }),
]);
export type ListArticlesQueryDto = Static<typeof ListArticlesQueryDto>;
