import type { IUser, IUserWithToken, UserRow } from '../interfaces';

export function toDomain(user: UserRow): IUser {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    bio: user.bio,
    image: user.image,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
  };
}

export function toDomainWithToken(
  user: UserRow,
  token: string,
): IUserWithToken {
  return {
    ...toDomain(user),
    token,
  };
}
