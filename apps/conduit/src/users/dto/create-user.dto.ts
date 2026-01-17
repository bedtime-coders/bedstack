import { type } from 'arktype';

export const CreateUserDto = type({
  user: {
    email: 'string.email',
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
      .and('8 <= string <= 100')
      .describe(
        'at least 8 characters and contain uppercase, lowercase, and numbers',
      ),
    username: /^[a-zA-Z0-9_-]+$/
      .and('3 <= string <= 50')
      .describe(
        '3-50 characters and contain only letters, numbers, underscores, and hyphens',
      ),
    'bio?': 'string <= 1000',
    'image?': 'string.url',
  },
});

export type CreateUserDto = typeof CreateUserDto.infer;
