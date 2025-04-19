import type { IArticle } from '../interfaces/article.interface';
import type { ArticleResponseDto } from '../dto';

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
