import { AuthorizationError, BadRequestError } from '@/errors';
import { slugify } from '@/utils/slugify';
import type { ArticlesRepository } from '@articles/articles.repository';
import type {
  ArticleInDb,
  ArticleToCreate,
  ArticleToCreateData,
  ArticleToUpdateRequest,
  ReturnedArticleList,
  ReturnedArticleResponse,
} from '@articles/articles.schema';
import type { ProfilesService } from '@profiles/profiles.service';
import { NotFoundError } from 'elysia';

export class ArticlesService {
  constructor(
    private readonly repository: ArticlesRepository,
    private readonly profilesService: ProfilesService,
  ) {}

  async find(query: {
    currentUserId: number | null;
    offset?: number;
    limit?: number;
    tag?: string;
    author?: string;
    favorited?: string;
    followedAuthors?: boolean;
  }): Promise<ReturnedArticleList> {
    const limit = query.limit || 20;
    const offset = query.offset || 0;
    return await this.repository.find({ ...query, limit, offset });
  }

  async findBySlug(slug: string, currentUserId: number | null = null) {
    const article = await this.repository.findBySlug(slug);
    if (!article) {
      throw new NotFoundError('Article not found');
    }
    return await this.generateArticleResponse(article, currentUserId);
  }

  async createArticle(article: ArticleToCreateData, currentUserId: number) {
    const articleToCreate: ArticleToCreate = {
      ...article,
      tagList: article.tagList?.sort() || [],
      authorId: currentUserId,
      slug: slugify(article.title),
    };
    const createdArticle = await this.repository.createArticle(articleToCreate);
    if (!createdArticle) {
      throw new BadRequestError('Article was not created');
    }
    return await this.generateArticleResponse(createdArticle, currentUserId);
  }

  async updateArticle(
    slug: string,
    article: ArticleToUpdateRequest,
    currentUserId: number,
  ) {
    const existingArticle = await this.repository.findBySlug(slug);
    if (!existingArticle) {
      throw new NotFoundError('Article not found');
    }
    if (existingArticle.authorId !== currentUserId) {
      throw new AuthorizationError('Only the author can update the article');
    }

    const newSlug = article.title
      ? slugify(article.title)
      : existingArticle.slug;
    await this.repository.updateArticle(
      existingArticle.id,
      { ...article, slug: newSlug },
      currentUserId,
    );
    return this.findBySlug(newSlug, currentUserId);
  }

  async deleteArticle(slug: string, currentUserId: number) {
    const article = await this.repository.findBySlug(slug);
    if (!article) {
      throw new NotFoundError('Article not found');
    }
    if (article.authorId !== currentUserId) {
      throw new AuthorizationError('Only the author can delete the article');
    }
    await this.repository.deleteArticle(slug, currentUserId);
    return {
      message: 'Article deleted',
      slug: article.slug,
    };
  }

  async generateArticleResponse(
    article: ArticleInDb,
    currentUserId: number | null,
  ): Promise<ReturnedArticleResponse> {
    const authorProfile = await this.profilesService.generateProfileResponse(
      article.author,
      currentUserId,
    );
    return {
      article: {
        slug: article.slug,
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        author: authorProfile.profile,
        favorited: !!article.favoritedBy.find(
          (user) => user.userId === currentUserId,
        ),
        favoritesCount: article.favoritedBy.length,
      },
    };
  }

  async favoriteArticle(slug: string, currentUserId: number) {
    const article = await this.repository.favoriteArticle(slug, currentUserId);
    if (!article) {
      throw new NotFoundError('Article not found');
    }
    return await this.generateArticleResponse(article, currentUserId);
  }

  async unfavoriteArticle(slug: string, currentUserId: number) {
    const article = await this.repository.unfavoriteArticle(slug, currentUserId);
    if (!article) {
      throw new NotFoundError('Article not found');
    }
    return await this.generateArticleResponse(article, currentUserId);
  }
}
