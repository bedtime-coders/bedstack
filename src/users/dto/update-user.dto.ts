import { type Static, Type } from '@sinclair/typebox';
import { CreateUserDto } from './create-user.dto';

export const UpdateUserDto = Type.Object({
  user: Type.Partial(CreateUserDto.user),
});

export type UpdateUserDto = Static<typeof UpdateUserDto>;
