import type { InferSelectModel } from 'drizzle-orm';
import type { articles, favoriteArticles } from '../schema';
import type { Profile } from '@/profiles/profiles.schema';
import type { ArticleTag } from '@/tags/tags.schema';

type ArticleFavoritedBy = InferSelectModel<typeof favoriteArticles>;

export interface ArticleInDb
  extends Omit<InferSelectModel<typeof articles>, 'authorId'> {
  author: Profile;
  favoritedBy: ArticleFavoritedBy[];
  tags: ArticleTag[];
}
