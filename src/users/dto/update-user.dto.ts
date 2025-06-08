import { type Static, Type } from '@sinclair/typebox';

export const UpdateUserDto = Type.Object({
  user: Type.Object({
    username: Type.Optional(Type.String()),
    email: Type.Optional(Type.String()),
    password: Type.Optional(Type.String()),
    bio: Type.Optional(Type.String()),
    image: Type.Optional(Type.String()),
  }),
});

export type UpdateUserDto = Static<typeof UpdateUserDto>;
