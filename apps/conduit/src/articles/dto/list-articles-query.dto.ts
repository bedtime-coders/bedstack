import { z } from 'zod';
import { ArticleFeedQueryDto } from './article-feed-query.dto';

export const ListArticlesQueryDto = ArticleFeedQueryDto.extend({
  tag: z.string().min(1).optional(),
  author: z.string().min(1).optional(),
  favorited: z.string().min(1).optional(),
});

export type ListArticlesQueryDto = z.infer<typeof ListArticlesQueryDto>;
