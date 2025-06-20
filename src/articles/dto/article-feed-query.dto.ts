import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  MAX_LIMIT,
  MIN_LIMIT,
  MIN_OFFSET,
} from '@/common/constants';
import { t } from 'elysia';

/**
 * DTO for article feed query parameters.
 * Uses offset-based pagination with the following constraints:
 * - limit: number of items per request (default: DEFAULT_LIMIT, min: MIN_LIMIT, max: MAX_LIMIT)
 * - offset: number of items to skip (default: DEFAULT_OFFSET, min: MIN_OFFSET)
 */
export const ArticleFeedQueryDto = t.Object({
  limit: t.Optional(
    t.Integer({
      minimum: MIN_LIMIT,
      maximum: MAX_LIMIT,
      default: DEFAULT_LIMIT,
      description: `Number of items per request (between ${MIN_LIMIT} and ${MAX_LIMIT}, defaults to ${DEFAULT_LIMIT})`,
    }),
  ),
  offset: t.Optional(
    t.Integer({
      minimum: MIN_OFFSET,
      default: DEFAULT_OFFSET,
      description: `Number of items to skip (at least ${MIN_OFFSET}, defaults to ${DEFAULT_OFFSET})`,
    }),
  ),
});

export type ArticleFeedQueryDto = typeof ArticleFeedQueryDto.static;
