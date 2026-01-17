import { type } from 'arktype';
import { CreateUserDto } from './create-user.dto';

export const UpdateUserDto = type({
  user: CreateUserDto.get('user').partial(),
});

export type UpdateUserDto = typeof UpdateUserDto.infer;
