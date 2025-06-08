import type { UserResponseDto } from '../dto';
import type { IUser } from '../interfaces';

export function toResponse(user: IUser): UserResponseDto {
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
