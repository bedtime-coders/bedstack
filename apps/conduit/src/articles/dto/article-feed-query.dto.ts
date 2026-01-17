import { type } from 'arktype';
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  MAX_LIMIT,
  MIN_LIMIT,
  MIN_OFFSET,
} from '@/shared/constants';

/**
 * DTO for article feed query parameters.
 * Uses offset-based pagination with the following constraints:
 * - limit: number of items per request (default: DEFAULT_LIMIT, min: MIN_LIMIT, max: MAX_LIMIT)
 * - offset: number of items to skip (default: DEFAULT_OFFSET, min: MIN_OFFSET)
 */
export const ArticleFeedQueryDto = type({
  'limit?': `${MIN_LIMIT} <= number.integer <= ${MAX_LIMIT} = ${DEFAULT_LIMIT}`,
  'offset?': `number.integer >= ${MIN_OFFSET} = ${DEFAULT_OFFSET}`,
});

export type ArticleFeedQueryDto = typeof ArticleFeedQueryDto.infer;
