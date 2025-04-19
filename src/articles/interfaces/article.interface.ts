import type { Profile } from '@/profiles/profiles.schema';

export interface IArticle {
  id: number;
  slug: string;
  title: string;
  description: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  // TODO: This is a hack. Just define the proper type in the profiles module and use it.
  author: Omit<
    Profile,
    'followers' | 'id' | 'email' | 'password' | 'createdAt' | 'updatedAt'
  > & {
    following: boolean;
  };
}
