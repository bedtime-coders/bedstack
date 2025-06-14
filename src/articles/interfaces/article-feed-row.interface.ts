import type { InferSelectModel } from 'drizzle-orm';
import type { articles } from '../articles.schema';

export type ArticleFeedRow = Omit<
  InferSelectModel<typeof articles>,
  'id' | 'authorId' | 'body'
> & {
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string | null;
    image: string | null;
    following: boolean;
  };
};
