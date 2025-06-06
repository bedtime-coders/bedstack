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

  async followUser(currentUserId: number, targetUsername: string) {
    const userToFollow =
      await this.usersRepository.findByUsername(targetUsername);
    if (!userToFollow) {
      throw new NotFoundError('Profile not found');
    }

    await this.repository.followUser(currentUserId, userToFollow.id);

    const followedProfile =
      await this.repository.findByUsername(targetUsername);
    if (!followedProfile) {
      throw new NotFoundError('Profile not found');
    }

    return await this.generateProfileResponse(followedProfile, currentUserId);
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
