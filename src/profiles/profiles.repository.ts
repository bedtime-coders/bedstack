import type { Database } from '@/database/database.providers';
import type { UserFollowRow } from '@/users/interfaces';
import { userFollows, users } from '@/users/users.schema';
import { and, eq } from 'drizzle-orm';
import type { ProfileRow } from './interfaces';

export class ProfilesRepository {
  constructor(private readonly db: Database) {}

  async findProfileByUsername(
    targetUsername: string,
  ): Promise<ProfileRow | null> {
    const [result] = await this.db.query.users.findMany({
      where: eq(users.username, targetUsername),
      with: { followers: true },
    });
    return result ?? null;
  }

  async findProfileByUserId(targetUserId: number): Promise<ProfileRow | null> {
    const [result] = await this.db.query.users.findMany({
      where: eq(users.id, targetUserId),
      with: { followers: true },
    });
    return result ?? null;
  }

  async findFollowedUserIds(currentUserId: number): Promise<number[]> {
    const results = await this.db
      .select({ followedId: userFollows.followedId })
      .from(userFollows)
      .where(eq(userFollows.followerId, currentUserId));

    return results.map((r) => r.followedId);
  }

  async followUser(
    currentUserId: number,
    userToFollow: number,
  ): Promise<UserFollowRow | null> {
    const [result] = await this.db
      .insert(userFollows)
      .values({ followedId: userToFollow, followerId: currentUserId })
      .onConflictDoNothing()
      .returning();
    return result ?? null;
  }

  async unfollowUser(
    currentUserId: number,
    userToUnfollow: number,
  ): Promise<boolean> {
    const result = await this.db
      .delete(userFollows)
      .where(
        and(
          eq(userFollows.followedId, userToUnfollow),
          eq(userFollows.followerId, currentUserId),
        ),
      )
      .returning({ id: userFollows.followedId });
    return result.length > 0;
  }

  async findFollowByUsers(
    followedId: number,
    followerId: number,
  ): Promise<boolean> {
    const result = await this.db
      .select({ id: userFollows.followedId })
      .from(userFollows)
      .where(
        and(
          eq(userFollows.followedId, followedId),
          eq(userFollows.followerId, followerId),
        ),
      )
      .limit(1);
    return result.length > 0;
  }
}
