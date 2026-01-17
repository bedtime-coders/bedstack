import { type } from 'arktype';

export const profileResponseSchema = type({
  profile: {
    username: 'string',
    'bio?': 'string | null',
    'image?': 'string | null',
    following: 'boolean',
  },
});

export type ProfileResponseDto = typeof profileResponseSchema.infer;
