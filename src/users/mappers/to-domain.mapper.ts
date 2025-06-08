import type { IUser, UserRow } from '../interfaces';

type ToDomainOptions = {
  token?: string;
};

export function toDomain(
  user: UserRow,
  { token }: ToDomainOptions = {},
): IUser {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    bio: user.bio,
    image: user.image,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    ...(token && { token }),
  };
}
