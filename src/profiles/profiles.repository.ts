import type { Database } from '@/database.providers';
import { userFollows, users } from '@users/users.model';
import { and, eq } from 'drizzle-orm';

export class ProfilesRepository {
  constructor(private readonly db: Database) {}

  async findByUsername(targetUsername: string) {
    const result = await this.db.query.users.findMany({
      where: eq(users.username, targetUsername),
      with: { followers: true },
    });
    if (result.length === 0) {
      return null;
    }
    return result[0];
  }

  async findByUserId(targetUserId: number) {
    const result = await this.db.query.users.findMany({
      where: eq(users.id, targetUserId),
      with: { followers: true },
    });
    if (result.length === 0) {
      return null;
    }
    return result[0];
  }

  async followUser(currentUserId: number, userToFollow: number) {
    const result = await this.db
      .insert(userFollows)
      .values({ followedId: userToFollow, followerId: currentUserId })
      .returning();
    return result[0];
  }

  async unfollowUser(currentUserId: number, userToUnfollow: number) {
    const result = await this.db
      .delete(userFollows)
      .where(
        and(
          eq(userFollows.followedId, userToUnfollow),
          eq(userFollows.followerId, currentUserId),
        ),
      )
      .returning();
    return result[0];
  }
}
