/**
 * Database row type for a user follow relationship
 */
export type UserFollowRow = {
  followedId: number;
  followerId: number;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Type for creating a new user follow relationship in the database
 */
export type NewUserFollowRow = Omit<UserFollowRow, 'createdAt' | 'updatedAt'>;
