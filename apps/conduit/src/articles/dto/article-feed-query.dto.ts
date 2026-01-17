import { z } from 'zod';
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
export const ArticleFeedQueryDto = z.object({
  limit: z.coerce
    .number()
    .int()
    .min(MIN_LIMIT)
    .max(MAX_LIMIT)
    .default(DEFAULT_LIMIT),
  offset: z.coerce.number().int().min(MIN_OFFSET).default(DEFAULT_OFFSET),
});

export type ArticleFeedQueryDto = z.infer<typeof ArticleFeedQueryDto>;
