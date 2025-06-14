import { slugify } from '@/utils/slugify';
import type { CommentResponseDto } from '@comments/dto';
import type { IComment } from '@comments/interfaces';
import type {
  ArticleResponseDto,
  ArticlesResponseDto,
  CreateArticleDto,
} from '../dto';
import type {
  ArticleFeedRow,
  ArticleRow,
  CreateArticleInput,
  IArticle,
  IArticleFeed,
  NewArticleRow,
} from '../interfaces';

/**
 * Additional options for the `toDomain` mapper.
 */
type ToDomainOptions = {
  /**
   * The tag list to use for the article.
   * If provided, will be used as the updated tag list for the article, instead of the existing tag list.
   */
  tagList?: string[];
  /**
   * The current user id. If provided, the response will include information about the current user's favorite status for the article.
   */
  currentUserId?: number;
};

export function toDomain(
  article: ArticleRow,
  { tagList, currentUserId }: ToDomainOptions,
): IArticle {
  return {
    id: article.id, // TODO: Do we need this?
    slug: article.slug,
    title: article.title,
    description: article.description,
    tagList: tagList ?? article.tags.map((t) => t.tagName),
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

export function toCreateArticleInput({
  article,
}: CreateArticleDto): CreateArticleInput {
  return {
    title: article.title,
    description: article.description,
    body: article.body,
    tagList: article.tagList ?? [],
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

export function toFeedResponse({
  articles,
  articlesCount,
}: {
  articles: IArticleFeed[];
  articlesCount?: number;
}): ArticlesResponseDto {
  const articlesResponse = articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    tagList: article.tagList,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
    favorited: article.favorited,
    favoritesCount: article.favoritesCount,
    author: article.author,
  }));
  return {
    articles: articlesResponse,
    articlesCount: articlesCount ?? articlesResponse.length,
  };
}

// TODO: Move this to the comments module
export function toCommentResponse(comment: IComment): CommentResponseDto {
  return {
    comment: {
      id: comment.id,
      body: comment.body,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
      author: {
        username: comment.author.username,
        bio: comment.author.bio,
        image: comment.author.image,
        following: comment.author.following,
      },
    },
  };
}
