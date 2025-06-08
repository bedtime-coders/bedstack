import type { Static } from '@sinclair/typebox';
import type { selectTagSchema } from '../dto/tag-response.dto';
import type { ITag } from '../interfaces/tag.interface';

export const toTagResponse = (tag: ITag): Static<typeof selectTagSchema> => ({
  name: tag.name,
  createdAt: tag.createdAt,
  updatedAt: tag.updatedAt,
});
