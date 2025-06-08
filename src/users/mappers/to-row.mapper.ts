import type { CreateUserDto, UpdateUserDto } from '../dto';
import type { NewUserRow, UpdateUserRow } from '../interfaces';

export function toNewRow({ user }: CreateUserDto): NewUserRow {
  return {
    email: user.email,
    username: user.username,
    password: user.password,
    bio: user.bio ?? '',
    image: user.image ?? '',
  };
}

export function toUpdateRow({ user }: UpdateUserDto): UpdateUserRow {
  return {
    ...(user.email && { email: user.email }),
    ...(user.username && { username: user.username }),
    ...(user.password && { password: user.password }),
    ...(user.bio && { bio: user.bio }),
    ...(user.image && { image: user.image }),
  };
}
