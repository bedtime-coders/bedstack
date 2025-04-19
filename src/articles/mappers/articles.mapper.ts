import type { ArticleResponseDto } from '../dto/article-response.dto';
import type { ArticleRow } from '../interfaces/article-row.interface';
import type { IArticle } from '../interfaces/article.interface';

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
  return {
    slug: article.slug,
    title: article.title,
    description: article.description,
    tagList: article.tagList,
    favorited: article.favorited,
    favoritesCount: article.favoritesCount,
    author: {
      username: article.author.username,
      bio: article.author.bio,
      image: article.author.image,
      following: false, // TODO
    },
    body: 'TODO',
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  };
}
