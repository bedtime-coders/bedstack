import type { InferSelectModel } from 'drizzle-orm';
import type { comments } from '../comments.schema';

export type CommentRow = InferSelectModel<typeof comments>;
