import type { TagRow } from '../interfaces/tag-row.interface';
import type { ITag } from '../interfaces/tag.interface';

export const toDomain = (row: TagRow): ITag => ({
  name: row.name,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});
