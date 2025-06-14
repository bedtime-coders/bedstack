import type { ProfileRow } from '@/profiles/interfaces';
import type { ArticleTagRow } from '@/tags/interfaces';
import type { InferSelectModel } from 'drizzle-orm';
import type { articles, favoriteArticles } from '../articles.schema';

export type ArticleRow = Omit<
  InferSelectModel<typeof articles>,
  'authorId' | 'body'
> & {
  author: ProfileRow;
  favoritedBy: InferSelectModel<typeof favoriteArticles>[];
  tags: ArticleTagRow[];
};
