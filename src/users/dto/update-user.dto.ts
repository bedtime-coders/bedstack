import { t } from 'elysia';
import { CreateUserDto } from './create-user.dto';

export const UpdateUserDto = t.Object({
  user: t.Partial(t.Object(CreateUserDto.properties.user.properties)),
});

export type UpdateUserDto = typeof UpdateUserDto.static;
