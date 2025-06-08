import type { Static } from '@sinclair/typebox';
import type { TagsResponseDto } from '../dto';
import type { ITag } from '../interfaces/tag.interface';

export const toTagsResponse = (
  tags: ITag[],
): Static<typeof TagsResponseDto> => ({
  tags: tags.map((tag) => tag.name),
});
