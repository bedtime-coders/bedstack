import { slugify } from '@/utils/slugify';
import type { ArticleResponseDto, CreateArticleDto } from '../dto';
import type {
  ArticleFeedRow,
  ArticleRow,
  CreateArticleInput,
  IArticle,
  IArticleFeed,
  NewArticleRow,
} from '../interfaces';

export function toDomain(
  article: ArticleRow,
  { currentUserId }: { currentUserId: number | null },
): IArticle {
  return {
    id: article.id, // TODO: Do we need this?
    slug: article.slug,
    title: article.title,
    description: article.description,
    tagList: article.tags.map((t) => t.tagName),
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    favorited: !!article.favoritedBy.find(
      (user) => user.userId === currentUserId,
    ),
    favoritesCount: article.favoritedBy.length,
    body: article.body,
    author: {
      username: article.author.username,
      bio: article.author.bio,
      image: article.author.image,
      following: !!article.author.followers.find(
        (follower) => follower.followerId === currentUserId,
      ),
    },
  };
}

export function toResponse(article: IArticle): ArticleResponseDto {
  // TODO: use the `toResponse` mapper from profiles, or make this an input
  const authorProfile = {
    username: article.author.username,
    bio: article.author.bio,
    image: article.author.image,
    following: article.author.following,
  };
  return {
    article: {
      slug: article.slug,
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList,
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
      author: authorProfile,
      favorited: article.favorited,
      favoritesCount: article.favoritesCount,
    },
  };
}

export function toCreateArticleInput(
  dto: CreateArticleDto['article'],
): CreateArticleInput {
  return {
    title: dto.title,
    description: dto.description,
    body: dto.body,
    tagList: dto.tagList ?? [],
  };
}

export function toNewArticleRow(
  input: CreateArticleInput,
  authorId: number,
): NewArticleRow {
  return {
    ...input,
    slug: slugify(input.title),
    authorId,
  };
}

export function toFeedDomain(article: ArticleFeedRow): IArticleFeed {
  return {
    slug: article.slug,
    title: article.title,
    description: article.description,
    tagList: article.tagList,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    favorited: article.favorited,
    favoritesCount: article.favoritesCount,
    author: article.author,
  };
}
