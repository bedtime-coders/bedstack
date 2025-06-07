import type { Database } from '@/database.providers';
import { articleTags } from '@tags/tags.model';
import { userFollows, users } from '@users/users.model';
import { and, count, desc, eq, inArray, sql } from 'drizzle-orm';
import { articles, favoriteArticles } from './articles.schema';
import type {
  ArticleFeedRow,
  ArticleRow,
  NewArticleRow,
  UpdateArticleRow,
} from './interfaces';

type FindFilters = {
  tag?: string;
  author?: string;
  favorited?: string;
};

type FindOptions = {
  offset: number;
  limit: number;
  currentUserId?: number;
  followedAuthorIds?: number[];
};

export class ArticlesRepository {
  constructor(private readonly db: Database) {}

  async find(
    { author, tag, favorited }: FindFilters,
    { offset, limit, currentUserId, followedAuthorIds }: FindOptions,
  ): Promise<{ articles: ArticleFeedRow[]; articlesCount: number }> {
    const authorFilters = [];
    if (author) {
      authorFilters.push(eq(users.username, author));
    }

    if (followedAuthorIds?.length) {
      authorFilters.push(inArray(users.id, followedAuthorIds));
    }

    const baseQuery = this.db
      .select({
        slug: articles.slug,
        title: articles.title,
        description: articles.description,
        tagList: sql<string[]>`
          coalesce(
            array_agg(article_tags.tag_name order by article_tags.tag_name ASC)
            filter (where article_tags.tag_name is not null),
            '{}'::text[]
          )
        `.as('tagList'),
        createdAt: articles.createdAt,
        updatedAt: articles.updatedAt,
        favorited: sql<boolean>`
          coalesce(
            exists (
              select 1 from ${favoriteArticles}
              where ${favoriteArticles.articleId} = ${articles.id}
              and ${favoriteArticles.userId} = ${currentUserId ?? sql`null`}
            ),
            false
          )
        `.as('favorited'),
        favoritesCount:
          sql<number>`count(distinct favorite_articles.user_id)::integer`.as(
            'favoriteCount',
          ),
        author: {
          username: users.username,
          bio: users.bio,
          image: users.image,
          following: sql<boolean>`
            coalesce(
              exists (
                select 1 from ${userFollows}
                where ${userFollows.followedId} = ${users.id}
                and ${userFollows.followerId} = ${currentUserId ?? sql`null`}
              ),
              false
            )
          `.as('following'),
        },
      })
      .from(articles)
      .innerJoin(users, eq(users.id, articles.authorId))
      .leftJoin(articleTags, eq(articleTags.articleId, articles.id))
      .leftJoin(favoriteArticles, eq(favoriteArticles.articleId, articles.id))
      .where(and(...authorFilters))
      .groupBy(articles.id, users.id)
      .orderBy(desc(articles.createdAt));

    const limitedResults = await baseQuery.limit(limit).offset(offset);

    const resultsCount = await this.db
      .select({ count: count() })
      .from(baseQuery.as('base'));

    return {
      articles: limitedResults,
      articlesCount: resultsCount[0].count,
    };
  }

  async findBySlug(slug: string): Promise<ArticleRow | null> {
    return (
      (await this.db.query.articles.findFirst({
        where: eq(articles.slug, slug),
        with: {
          author: {
            with: {
              followers: true,
            },
          },
          favoritedBy: true,
          tags: true,
        },
      })) ?? null
    );
  }

  async findById(id: number): Promise<ArticleRow | null> {
    const result = await this.db.query.articles.findFirst({
      where: eq(articles.id, id),
      with: {
        author: {
          with: {
            followers: true,
          },
        },
        favoritedBy: true,
        tags: true,
      },
    });
    return result ?? null;
  }

  async createArticle(article: NewArticleRow): Promise<ArticleRow> {
    const results = await this.db.insert(articles).values(article).returning();
    const newArticle = results[0];
    const result = await this.findById(newArticle.id);
    if (!result) {
      throw new Error(`Article with id ${newArticle.id} not found`);
    }
    return result;
  }

  async updateArticle(
    slug: string,
    article: UpdateArticleRow,
    currentUserId: number,
  ): Promise<ArticleRow> {
    const results = await this.db
      .update(articles)
      .set({
        ...article,
        updatedAt: new Date(),
      })
      .where(and(eq(articles.slug, slug), eq(articles.authorId, currentUserId)))
      .returning();

    const updatedArticle = results[0];
    const result = await this.findById(updatedArticle.id);
    if (!result) {
      throw new Error(`Article with id ${updatedArticle.id} not found`);
    }
    return result;
  }

  async deleteArticle(slug: string, currentUserId: number): Promise<void> {
    await this.db
      .delete(articles)
      .where(
        and(eq(articles.slug, slug), eq(articles.authorId, currentUserId)),
      );
  }

  async favoriteArticle(slug: string, currentUserId: number) {
    // TODO: Use a transaction to optimize from 1-3 ops to 1 op
    const article = await this.findBySlug(slug);
    if (!article) {
      return null;
    }

    // Insert the favorite and get the updated article state
    await this.db
      .insert(favoriteArticles)
      .values({ articleId: article.id, userId: currentUserId })
      .onConflictDoNothing();

    // Return the updated article state
    return this.findBySlug(slug);
  }

  async unfavoriteArticle(slug: string, currentUserId: number) {
    // TODO: Use a transaction to optimize from 1-3 ops to 1 op
    const article = await this.findBySlug(slug);
    if (!article) {
      return null;
    }

    // Delete the favorite and get the updated article state
    await this.db
      .delete(favoriteArticles)
      .where(
        and(
          eq(favoriteArticles.articleId, article.id),
          eq(favoriteArticles.userId, currentUserId),
        ),
      );

    // Return the updated article state
    return this.findBySlug(slug);
  }
}
