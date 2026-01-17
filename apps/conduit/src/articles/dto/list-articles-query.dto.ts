import { type } from 'arktype';
import { ArticleFeedQueryDto } from './article-feed-query.dto';

export const ListArticlesQueryDto = ArticleFeedQueryDto.merge({
  'tag?': 'string > 0',
  'author?': 'string > 0',
  'favorited?': 'string > 0',
});

export type ListArticlesQueryDto = typeof ListArticlesQueryDto.infer;
