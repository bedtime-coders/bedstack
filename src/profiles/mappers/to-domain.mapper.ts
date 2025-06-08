import type { ProfileRow } from '../interfaces/profile-row.interface';
import type { IProfile } from '../interfaces/profile.interface';

/**
 * Map a profile row to a domain profile
 * @param profile - The profile row to map
 * @param following - Whether the current user is following this profile
 * @returns The mapped profile
 */
export function toDomain(profile: ProfileRow, following: boolean): IProfile {
  return {
    username: profile.username,
    bio: profile.bio,
    image: profile.image,
    following,
  };
}
