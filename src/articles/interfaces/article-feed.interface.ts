import type { ProfileFeed } from './profile-feed.interface';

export type IArticleFeed = {
  slug: string;
  title: string;
  description: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: ProfileFeed;
};
