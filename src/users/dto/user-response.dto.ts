import { type Static, Type } from '@sinclair/typebox';

export const UserDto = Type.Object({
  id: Type.Number(),
  username: Type.String(),
  email: Type.String(),
  bio: Type.Union([Type.String(), Type.Null()]),
  image: Type.Union([Type.String(), Type.Null()]),
  token: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
});

export const UserResponseDto = Type.Object({
  user: UserDto,
});

export type UserResponseDto = Static<typeof UserResponseDto>;
