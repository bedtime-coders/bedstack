import type { InferSelectModel } from 'drizzle-orm';
import type { tags } from '../tags.schema';

export type TagRow = InferSelectModel<typeof tags>;
