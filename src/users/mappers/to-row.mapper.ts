import type { CreateUserDto, UpdateUserDto } from '../dto';
import type { NewUserRow, UpdateUserRow } from '../interfaces';

export function toNewRow(dto: CreateUserDto): NewUserRow {
  return {
    email: dto.email,
    username: dto.username,
    password: dto.password,
    bio: '',
    image: '',
  };
}

export function toUpdateRow(dto: UpdateUserDto): UpdateUserRow {
  return {
    ...(dto.email && { email: dto.email }),
    ...(dto.username && { username: dto.username }),
    ...(dto.password && { password: dto.password }),
    ...(dto.bio && { bio: dto.bio }),
    ...(dto.image && { image: dto.image }),
  };
}
