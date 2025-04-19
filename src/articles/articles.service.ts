import { AuthorizationError, BadRequestError } from '@/errors';
import { slugify } from '@/utils/slugify';
import type { ArticlesRepository } from '@articles/articles.repository';
import type { ProfilesService } from '@profiles/profiles.service';
import type { TagsService } from '@tags/tags.service';
import { NotFoundError } from 'elysia';
import type {
  CreateArticleInput,
  NewArticleRow,
  UpdateArticleInput,
} from './interfaces';
import { toNewArticleRow, toResponse } from './mappers/articles.mapper';

export class ArticlesService {
  constructor(
    private readonly repository: ArticlesRepository,
    private readonly profilesService: ProfilesService,
    private readonly tagsService: TagsService,
  ) {}

  async find(
    query: {
      offset?: number;
      limit?: number;
      tag?: string;
      author?: string;
      favorited?: string;
    },
    options: {
      followedAuthors?: boolean;
      currentUserId?: number;
    } = {},
  ) {
    const limit = query.limit || 20;
    const offset = query.offset || 0;
    const currentUserId = options.currentUserId ?? null;
    return await this.repository.find({
      ...query,
      limit,
      offset,
      ...options,
      currentUserId,
    });
  }

  async findBySlug(slug: string, currentUserId: number | null = null) {
    const article = await this.repository.findBySlug(slug);
    if (!article) {
      throw new NotFoundError('Article not found');
    }
    return toResponse(article, currentUserId);
  }

  async createArticle(article: CreateArticleInput, currentUserId: number) {
    const newArticle = toNewArticleRow(article, currentUserId);

    const createdArticle = await this.repository.createArticle(newArticle);

    if (!createdArticle) {
      throw new BadRequestError('Article was not created');
    }

    if (article.tagList.length) {
      await this.tagsService.upsertArticleTags(
        createdArticle.id,
        article.tagList,
      );
    }

    return toResponse(createdArticle, currentUserId);
  }

  async updateArticle(
    slug: string,
    article: UpdateArticleInput,
    currentUserId: number,
  ) {
    // TODO: Add transaction to ensure both or none of the operations are done
    const { tagList, ...articleData } = article;
    const existingArticle = await this.repository.findBySlug(slug);
    if (!existingArticle) {
      throw new NotFoundError('Article not found');
    }
    if (existingArticle.authorId !== currentUserId) {
      throw new AuthorizationError('Only the author can update the article');
    }

    const newSlug = articleData.title
      ? slugify(articleData.title)
      : existingArticle.slug;
    await this.repository.updateArticle(
      existingArticle.id,
      { ...articleData, slug: newSlug },
      currentUserId,
    );

    if (tagList) {
      await this.tagsService.upsertArticleTags(existingArticle.id, tagList);
    }

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

    // articleTags will be deleted as well due to the cascade rule
    await this.repository.deleteArticle(slug, currentUserId);
    return {
      message: 'Article deleted',
      slug: article.slug,
    };
  }

  async favoriteArticle(slug: string, currentUserId: number) {
    const article = await this.repository.favoriteArticle(slug, currentUserId);
    if (!article) {
      throw new NotFoundError('Article not found');
    }
    return toResponse(article, currentUserId);
  }

  async unfavoriteArticle(slug: string, currentUserId: number) {
    const article = await this.repository.unfavoriteArticle(
      slug,
      currentUserId,
    );
    if (!article) {
      throw new NotFoundError('Article not found');
    }
    return toResponse(article, currentUserId);
  }
}
