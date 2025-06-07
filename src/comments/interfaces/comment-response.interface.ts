import type { IArticle } from '@/articles/interfaces/article.interface';
import type { ProfileFeed } from '@/articles/interfaces/profile-feed.interface';

export type CommentResponse = {
  id: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  author: ProfileFeed;
  article: IArticle;
};
