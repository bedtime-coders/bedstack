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
    ...(user.email !== undefined && { email: user.email }),
    ...(user.username !== undefined && { username: user.username }),
    ...(user.password !== undefined && { password: user.password }),
    ...(user.bio !== undefined && { bio: user.bio || '' }),
    ...(user.image !== undefined && { image: user.image || '' }),
  };
}
