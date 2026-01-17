import { type } from 'arktype';

export const ArticleResponseDto = type({
  article: {
    slug: 'string',
    title: 'string',
    description: 'string',
    body: 'string',
    tagList: 'string[]',
    createdAt: 'string',
    updatedAt: 'string',
    favorited: 'boolean',
    favoritesCount: 'number',
    author: {
      username: 'string',
      'bio?': 'string | null',
      'image?': 'string | null',
      following: 'boolean',
    },
  },
});

export type ArticleResponseDto = typeof ArticleResponseDto.infer;
