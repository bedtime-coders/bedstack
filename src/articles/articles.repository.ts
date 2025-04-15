import type {
  ArticleToCreate,
  ArticleToUpdate,
} from '@/articles/articles.schema';
import type { Database } from '@/database.providers';
import { userFollows, users } from '@/users/users.model';
import { articles, favoriteArticles } from '@articles/articles.model';
import { and, arrayContains, count, desc, eq, inArray, sql } from 'drizzle-orm';

export class ArticlesRepository {
  constructor(private readonly db: Database) {}

  async find({
    currentUserId,
    offset,
    limit,
    tag,
    author,
    favorited,
    followedAuthors,
  }: {
    currentUserId: number | null;
    offset: number;
    limit: number;
    tag?: string;
    author?: string;
    favorited?: string;
    followedAuthors?: boolean;
  }) {
    const authorFilters = [];
    if (author) {
      authorFilters.push(eq(users.username, author));
    }
    if (followedAuthors && currentUserId) {
      authorFilters.push(
        inArray(
          users.id,
          this.db
            .select({ followedAuthors: userFollows.followedId })
            .from(userFollows)
            .where(eq(userFollows.followerId, currentUserId)),
        ),
      );
    }

    const authorsWithFollowersCTE = this.db.$with('authorsWithFollowers').as(
      this.db
        .select({
          authorId: users.id,
          authorUsername: users.username,
          authorBio: users.bio,
          authorImage: users.image,
          authorFollowing:
            sql<boolean>`coalesce(${currentUserId} = any(array_agg(user_follows.follower_id)), false)`.as(
              'authorFollowing',
            ),
        })
        .from(users)
        .leftJoin(userFollows, eq(users.id, userFollows.followedId))
        .where(and(...authorFilters))
        .groupBy(users.id),
    );

    const articleFilters = [];
    if (tag) {
      articleFilters.push(arrayContains(articles.tagList, [tag]));
    }
    if (favorited) {
      articleFilters.push(eq(users.username, favorited));
    }

    const articlesWithLikesCTE = this.db.$with('articlesWithLikes').as(
      this.db
        .select({
          articleId: articles.id,
          favorited:
            sql<boolean>`coalesce(${currentUserId} = any(array_agg(favorite_articles.user_id)), false)`.as(
              'favorited',
            ),
          favoriteCount: sql<number>`count(*)::integer`.as('favoriteCount'),
        })
        .from(articles)
        .leftJoin(favoriteArticles, eq(favoriteArticles.articleId, articles.id))
        .leftJoin(users, eq(users.id, favoriteArticles.userId))
        .where(and(...articleFilters))
        .groupBy(articles.id),
    );

    const resultsQuery = this.db
      .with(authorsWithFollowersCTE, articlesWithLikesCTE)
      .select({
        slug: articles.slug,
        title: articles.title,
        description: articles.description,
        tagList: articles.tagList,
        createdAt: articles.createdAt,
        updatedAt: articles.updatedAt,
        favorited: articlesWithLikesCTE.favorited,
        favoritesCount: articlesWithLikesCTE.favoriteCount,
        author: {
          username: authorsWithFollowersCTE.authorUsername,
          bio: authorsWithFollowersCTE.authorBio,
          image: authorsWithFollowersCTE.authorImage,
          following: authorsWithFollowersCTE.authorFollowing,
        },
      })
      .from(articles)
      .innerJoin(
        articlesWithLikesCTE,
        eq(articlesWithLikesCTE.articleId, articles.id),
      )
      .innerJoin(
        authorsWithFollowersCTE,
        eq(authorsWithFollowersCTE.authorId, articles.authorId),
      )
      .orderBy(desc(articles.createdAt))
      .as('results');

    const limitedResults = await this.db
      .select()
      .from(resultsQuery)
      .limit(limit)
      .offset(offset);

    const resultsCount = await this.db
      .select({ count: count() })
      .from(resultsQuery);

    return { articles: limitedResults, articlesCount: resultsCount[0].count };
  }

  async findBySlug(slug: string) {
    const result = await this.db.query.articles.findFirst({
      where: eq(articles.slug, slug),
      with: {
        author: {
          with: {
            followers: true,
          },
        },
        favoritedBy: true,
      },
    });
    if (!result) return null;
    return result;
  }

  async findById(id: number) {
    const result = await this.db.query.articles.findFirst({
      where: eq(articles.id, id),
      with: {
        author: {
          with: {
            followers: true,
          },
        },
        favoritedBy: true,
      },
    });
    if (!result) return null;
    return result;
  }

  async createArticle(article: ArticleToCreate) {
    const results = await this.db.insert(articles).values(article).returning();
    const newArticle = results[0];
    return this.findById(newArticle.id);
  }

  async updateArticle(
    articleId: number,
    article: ArticleToUpdate,
    currentUserId: number,
  ) {
    const filteredArticle = Object.fromEntries(
      Object.entries(article).filter(([_, value]) => value !== undefined),
    );
    await this.db
      .update(articles)
      .set({
        ...filteredArticle,
        updatedAt: new Date(),
      })
      .where(
        and(eq(articles.id, articleId), eq(articles.authorId, currentUserId)),
      );
  }

  async deleteArticle(slug: string, currentUserId: number) {
    return await this.db
      .delete(articles)
      .where(
        and(eq(articles.slug, slug), eq(articles.authorId, currentUserId)),
      );
  }

  async favoriteArticle(slug: string, currentUserId: number) {
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
