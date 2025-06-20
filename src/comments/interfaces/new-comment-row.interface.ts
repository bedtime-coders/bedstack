import type { InferNewRow } from '@/shared/interfaces';
import type { comments } from '../comments.schema';

export type NewCommentRow = InferNewRow<typeof comments>;
