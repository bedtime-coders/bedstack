import { type Static, Type } from '@sinclair/typebox';

export const CreateUserDto = Type.Object({
  user: Type.Object({
    username: Type.String(),
    email: Type.String(),
    password: Type.String(),
  }),
});

export type CreateUserDto = Static<typeof CreateUserDto>;
