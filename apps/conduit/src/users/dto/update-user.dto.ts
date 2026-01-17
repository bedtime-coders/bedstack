import { z } from 'zod';
import { CreateUserDto } from './create-user.dto';

export const UpdateUserDto = z.object({
  user: CreateUserDto.shape.user.partial(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserDto>;
