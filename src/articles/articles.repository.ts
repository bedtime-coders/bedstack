import { and, count, desc, eq, inArray, type SQL, sql } from 'drizzle-orm';
import type { Database } from '@/database/database.providers';
import { articleTags } from '@/tags/tags.schema';
import { userFollows, users } from '@/users/users.schema';
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
  followedAuthorIds?: number[];
};

type FindOptions = {
  offset: number;
  limit: number;
  currentUserId?: number;
};

export class ArticlesRepository {
  constructor(private readonly db: Database) {}

  async find(
    { author, tag, favorited, followedAuthorIds }: FindFilters,
    { offset, limit, currentUserId }: FindOptions,
  ): Promise<{ articles: ArticleFeedRow[]; articlesCount: number }> {
    const authorFilters: SQL[] = [];

    if (followedAuthorIds !== undefined) {
      authorFilters.push(inArray(users.id, followedAuthorIds));
    }

    if (author !== undefined) {
      authorFilters.push(eq(users.username, author));
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
      .leftJoin(favoriteArticles, eq(favoriteArticles.articleId, articles.id));

    // Create a separate count query that only includes filtering conditions
    const countQuery = this.db
      .select({ id: articles.id })
      .from(articles)
      .innerJoin(users, eq(users.id, articles.authorId))
      .leftJoin(articleTags, eq(articleTags.articleId, articles.id))
      .leftJoin(favoriteArticles, eq(favoriteArticles.articleId, articles.id));

    // Accumulate all filters into a single combined filter
    const allFilters: SQL[] = [];

    // Add author filters
    if (authorFilters.length > 0) {
      const authorFilter = and(...authorFilters);
      if (authorFilter) {
        allFilters.push(authorFilter);
      }
    }

    // Add tag filter
    if (tag !== undefined) {
      allFilters.push(
        sql`exists (
          select 1 from ${articleTags}
          where ${articleTags.articleId} = ${articles.id}
          and ${articleTags.tagName} = ${tag}
        )`,
      );
    }

    // Add favorited filter
    if (favorited !== undefined) {
      const favoritedByUser = await this.db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.username, favorited))
        .limit(1);

      if (!favoritedByUser[0]) {
        // If user doesn't exist, return no results
        return { articles: [], articlesCount: 0 };
      }

      allFilters.push(
        sql`exists (
          select 1 from ${favoriteArticles}
          where ${favoriteArticles.articleId} = ${articles.id}
          and ${favoriteArticles.userId} = ${favoritedByUser[0].id}
        )`,
      );
    }

    // Apply the combined filter to both queries
    if (allFilters.length > 0) {
      const combinedFilter = and(...allFilters);
      baseQuery.where(combinedFilter);
      countQuery.where(combinedFilter);
    }

    const limitedResults = await baseQuery
      .groupBy(articles.id, users.id)
      .orderBy(desc(articles.createdAt))
      .limit(limit)
      .offset(offset);

    const resultsCount = await this.db
      .select({ count: count() })
      .from(countQuery.as('count_query'));

    return {
      articles: limitedResults,
      articlesCount: resultsCount[0]?.count ?? 0,
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

  /**
   * @param article - The article to create
   * @returns The created article or null if the article was not created successfully
   */
  async createArticle(article: NewArticleRow): Promise<ArticleRow | null> {
    const results = await this.db.insert(articles).values(article).returning();

    const newArticle = results[0];
    if (!newArticle) {
      return null;
    }
    return await this.findById(newArticle.id);
  }

  /**
   * @param slug - The slug of the article to update
   * @param article - The article to update
   * @param currentUserId - The ID of the user updating the article
   * @returns The updated article or null if the article was not updated successfully
   */
  async updateArticle(
    slug: string,
    article: UpdateArticleRow,
    currentUserId: number,
  ): Promise<ArticleRow | null> {
    const results = await this.db
      .update(articles)
      .set({
        ...article,
        updatedAt: new Date(),
      })
      .where(and(eq(articles.slug, slug), eq(articles.authorId, currentUserId)))
      .returning();

    const updatedArticle = results[0];
    if (!updatedArticle) {
      return null;
    }
    return await this.findById(updatedArticle.id);
  }

  async deleteArticle(slug: string, currentUserId: number): Promise<boolean> {
    const deletedArticles = await this.db
      .delete(articles)
      .where(and(eq(articles.slug, slug), eq(articles.authorId, currentUserId)))
      .returning({ id: articles.id });
    return deletedArticles.length > 0;
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

    return this.findBySlug(slug);
  }

  async unfavoriteArticle(slug: string, currentUserId: number) {
    // TODO: Use a transaction to optimize from 1-3 ops to 1 op
    const article = await this.findBySlug(slug);
    if (!article) return null;

    await this.db
      .delete(favoriteArticles)
      .where(
        and(
          eq(favoriteArticles.articleId, article.id),
          eq(favoriteArticles.userId, currentUserId),
        ),
      );

    return this.findBySlug(slug);
  }
}
