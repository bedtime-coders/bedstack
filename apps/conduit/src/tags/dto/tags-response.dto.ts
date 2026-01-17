import { type } from 'arktype';

export const TagsResponseDto = type({
  tags: 'string[]',
});

export type TagsResponseDto = typeof TagsResponseDto.infer;
