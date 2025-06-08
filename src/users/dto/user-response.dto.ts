import { type Static, Type } from '@sinclair/typebox';

export const UserResponseDto = Type.Object({
  id: Type.Number(),
  username: Type.String(),
  email: Type.String(),
  bio: Type.String(),
  image: Type.String(),
  token: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
});

export type UserResponseDto = Static<typeof UserResponseDto>;
