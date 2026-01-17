import type { articles } from '@/articles/articles.schema';
import type { InferNewRow } from '@/shared/interfaces';

export type NewArticleRow = InferNewRow<typeof articles>;
