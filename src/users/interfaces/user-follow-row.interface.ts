import type { InferSelectModel } from 'drizzle-orm';
import type { InferNewRow } from '@/shared/interfaces';
import type { userFollows } from '../users.schema';

/**
 * Database row type for a user follow relationship
 */
export type UserFollowRow = InferSelectModel<typeof userFollows>;
export type NewUserFollowRow = InferNewRow<typeof userFollows>;
