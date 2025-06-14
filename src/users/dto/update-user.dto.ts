import { t } from 'elysia';
import { CreateUserDto } from './create-user.dto';

export const UpdateUserDto = t.Object({
  user: t.Partial(CreateUserDto.properties.user),
});

export type UpdateUserDto = typeof UpdateUserDto.static;
