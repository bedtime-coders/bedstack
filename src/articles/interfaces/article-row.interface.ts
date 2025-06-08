import type { ArticleTagRow } from '@tags/interfaces';
import type { InferSelectModel } from 'drizzle-orm';
import type { articles, favoriteArticles } from '../articles.schema';
import type { ProfileRow } from '@/profiles/interfaces';

type ArticleFavoritedBy = InferSelectModel<typeof favoriteArticles>;

export interface ArticleRow
  extends Omit<InferSelectModel<typeof articles>, 'authorId'> {
  author: ProfileRow;
  favoritedBy: ArticleFavoritedBy[];
  tags: ArticleTagRow[];
}
