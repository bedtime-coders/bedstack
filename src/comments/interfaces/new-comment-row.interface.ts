import type { InferNewRow } from '@/common/interfaces';
import type { comments } from '../comments.schema';

export type NewCommentRow = InferNewRow<typeof comments>;
