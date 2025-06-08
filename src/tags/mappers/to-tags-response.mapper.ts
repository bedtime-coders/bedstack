import type { Static } from '@sinclair/typebox';
import type { ListTagsResponseSchema } from '../dto/tag-response.dto';
import type { ITag } from '../interfaces/tag.interface';
import { toTagResponse } from './to-tag-response.mapper';

export const toTagsResponse = (
  tags: ITag[],
): Static<typeof ListTagsResponseSchema> => ({
  tags: tags.map((tag) => tag.name),
});
