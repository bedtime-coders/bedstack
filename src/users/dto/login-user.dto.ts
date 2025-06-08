import { Type } from '@sinclair/typebox';

export const LoginUserDto = Type.Object({
  email: Type.String(),
  password: Type.String(),
});
