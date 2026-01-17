import { type } from 'arktype';

export const CreateArticleDto = type({
  article: {
    title: 'string > 0',
    description: 'string > 0',
    body: 'string > 0',
    'tagList?': 'string[]',
  },
});

export type CreateArticleDto = typeof CreateArticleDto.infer;
