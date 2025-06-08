import { type Static, Type } from '@sinclair/typebox';

export const LoginUserDto = Type.Object({
  email: Type.String(),
  password: Type.String(),
});

export type LoginUserDto = Static<typeof LoginUserDto>;
