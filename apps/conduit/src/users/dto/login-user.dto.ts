import { type } from 'arktype';

export const LoginUserDto = type({
  user: {
    email: 'string.email',
    password: 'string',
  },
});

export type LoginUserDto = typeof LoginUserDto.infer;
