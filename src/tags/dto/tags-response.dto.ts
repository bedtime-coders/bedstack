import { t } from 'elysia';

export const TagsResponseDto = t.Object({
  tags: t.Array(t.String()),
});

export type TagsResponseDto = typeof TagsResponseDto.static;
