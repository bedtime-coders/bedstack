import type { UserFollowRow } from './user-follow-row.interface';

/**
 * Type for creating a new user follow relationship in the database
 */
export type NewUserFollowRow = Omit<UserFollowRow, 'createdAt' | 'updatedAt'>;
