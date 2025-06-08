import { Type } from '@sinclair/typebox';

export const TagsResponseDto = Type.Object({
  tags: Type.Array(Type.String()),
});

export type TagsResponse = typeof TagsResponseDto;
