import type { UserResponseDto } from '../dto';
import type { IUserWithToken } from '../interfaces';

export function toResponse(user: IUserWithToken): UserResponseDto {
  return {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      bio: user.bio,
      image: user.image,
      token: user.token,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    },
  };
}
