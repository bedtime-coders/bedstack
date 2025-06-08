import { Type } from '@sinclair/typebox';

export const CreateUserDto = Type.Object({
  username: Type.String(),
  email: Type.String(),
  password: Type.String(),
});
