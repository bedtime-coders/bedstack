import { and, desc, eq } from 'drizzle-orm';
import type { Database } from '@/database/database.providers';
import { comments } from './comments.schema';
import type { NewCommentRow } from './interfaces';

export class CommentsRepository {
  constructor(private readonly db: Database) {}

  async create(commentData: NewCommentRow) {
    const [comment] = await this.db
      .insert(comments)
      .values(commentData)
      .returning();
    return comment ?? null;
  }

  /**
   * Find a comment by its id
   * @param id - The id of the comment
   * @returns The comment
   */
  async findById(id: number) {
    const result = await this.db.query.comments.findFirst({
      where: eq(comments.id, id),
    });
    return result;
  }

  /**
   * Find all comments by article id
   *
   * Note: this operation is optimized to include the author and their followers.
   * Use it with caution. If you need something simpler, consider refactoring this method and making the "with" option dynamic.
   * @param articleId - The id of the article
   * @returns An array of comments
   */
  async findManyByArticleId(articleId: number) {
    const result = await this.db.query.comments.findMany({
      where: eq(comments.articleId, articleId),
      orderBy: [desc(comments.createdAt)],
      with: {
        author: {
          columns: {
            id: true,
            username: true,
            bio: true,
            image: true,
          },
          with: {
            followers: true,
          },
        },
      },
    });
    return result;
  }

  async delete(commentId: number, authorId: number): Promise<boolean> {
    const deletedComments = await this.db
      .delete(comments)
      .where(and(eq(comments.id, commentId), eq(comments.authorId, authorId)))
      .returning({ id: comments.id });
    return deletedComments.length > 0;
  }
}
