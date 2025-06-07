import { ConflictError } from '@/errors';
import type { IProfile } from '@profiles/interfaces';
import type { ProfilesRepository } from '@profiles/profiles.repository';
import type { ParsedProfileSchema, Profile } from '@profiles/profiles.schema';
import type { UsersRepository } from '@users/users.repository';
import { NotFoundError } from 'elysia';

export class ProfilesService {
  constructor(
    private readonly repository: ProfilesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async findByUsername(currentUserId: number, targetUsername: string) {
    const user = await this.repository.findByUsername(targetUsername);
    if (!user) {
      throw new NotFoundError('Profile not found');
    }
    return await this.generateProfileResponse(user, currentUserId);
  }

  async findByUserId(currentUserId: number | null, targetUserId: number) {
    const user = await this.repository.findByUserId(targetUserId);
    if (!user) {
      throw new NotFoundError('Profile not found');
    }
    return await this.generateProfileResponse(user, currentUserId);
  }

  async followUser(
    username: string,
    currentUserId: number,
  ): Promise<ParsedProfileSchema> {
    const userToFollow = await this.repository.findByUsername(username);
    if (!userToFollow) {
      throw new NotFoundError('User not found');
    }

    // Check if already following
    const existingFollow = await this.repository.findFollowByUsers(
      userToFollow.id,
      currentUserId,
    );
    if (existingFollow) {
      throw new ConflictError('You are already following this user');
    }

    await this.repository.followUser(currentUserId, userToFollow.id);
    return this.findByUsername(currentUserId, username);
  }

  async unfollowUser(currentUserId: number, targetUsername: string) {
    const userToUnfollow = await this.repository.findByUsername(targetUsername);
    if (!userToUnfollow) {
      throw new NotFoundError('Profile not found');
    }

    await this.repository.unfollowUser(currentUserId, userToUnfollow.id);

    const unfollowedProfile =
      await this.repository.findByUsername(targetUsername);
    if (!unfollowedProfile) {
      throw new NotFoundError('Profile not found');
    }

    return await this.generateProfileResponse(unfollowedProfile, currentUserId);
  }

  async generateProfileResponse(
    user: Profile,
    currentUserId: number | null,
  ): Promise<ParsedProfileSchema> {
    return {
      profile: {
        bio: user.bio,
        image: user.image,
        username: user.username,
        following:
          currentUserId == null
            ? false
            : !!user.followers.find(
                (follower) => follower.followerId === currentUserId,
              ),
      },
    };
  }

  async findFollowedUserIds(currentUserId: number): Promise<number[]> {
    return this.repository.findFollowedUserIds(currentUserId);
  }
}
