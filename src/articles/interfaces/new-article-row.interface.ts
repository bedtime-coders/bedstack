import type { InferInsertModel } from 'drizzle-orm';
import type { articles } from '@/articles/articles.schema';

export type NewArticleRow = InferInsertModel<typeof articles>;
