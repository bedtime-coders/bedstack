/**
 * Database row type for a user follow relationship
 */
export type UserFollowRow = {
  followedId: number;
  followerId: number;
  createdAt: Date;
  updatedAt: Date;
};
