import type {
  CreateUserInput,
  NewUserRow,
  UpdateUserInput,
  UpdateUserRow,
} from '../interfaces';

export function toNewUserRow(input: CreateUserInput): NewUserRow {
  return {
    email: input.email,
    username: input.username,
    password: input.password,
    bio: input.bio ?? null,
    image: input.image ?? null,
  };
}

export function toUpdateUserRow(input: UpdateUserInput): UpdateUserRow {
  return {
    ...(input.email !== undefined && { email: input.email }),
    ...(input.username !== undefined && { username: input.username }),
    ...(input.password !== undefined && { password: input.password }),
    ...(input.bio !== undefined && { bio: input.bio ?? null }),
    ...(input.image !== undefined && { image: input.image ?? null }),
  };
}
