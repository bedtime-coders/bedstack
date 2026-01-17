import { type } from 'arktype';

export const UserResponseDto = type({
  user: {
    email: 'string',
    token: 'string',
    username: 'string',
    bio: 'string | null',
    image: 'string | null',
  },
});

export type UserResponseDto = typeof UserResponseDto.infer;
