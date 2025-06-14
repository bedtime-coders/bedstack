import type { articles } from '@/articles/articles.schema';
import type { InferNewRow } from '@/common/interfaces';

export type NewArticleRow = InferNewRow<typeof articles>;
