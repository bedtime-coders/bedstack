import type { ArticleTag } from './dto/article-tag.dto';
import type { ITag } from './interfaces/tag.interface';
import { toDomain, toTagsResponse } from './mappers';
import type { TagsRepository } from './tags.repository';

export class TagsService {
  constructor(private readonly repository: TagsRepository) {}

  async getTags() {
    const tagRows = await this.repository.getTags();
    const tags = tagRows.map(toDomain);
    return toTagsResponse(tags);
  }

  async upsertTags(tagNames: string[]): Promise<ITag[]> {
    const tagRows = await this.repository.upsertTags(tagNames);
    return tagRows.map(toDomain);
  }

  async upsertArticleTags(articleId: number, tagNames: string[]) {
    // TODO: use transaction
    if (tagNames.length === 0) return;

    // Ensure every tag exists
    await this.upsertTags(tagNames);

    // Delete old tags for the article
    const articleTags = await this.repository.getArticleTags(articleId);
    const tagsToDelete = articleTags
      .filter((tag: ArticleTag) => !tagNames.includes(tag.tagName))
      .map((tag: ArticleTag) => tag.tagName);
    if (tagsToDelete.length > 0) {
      await this.repository.deleteArticleTags({
        articleId,
        tagNames: tagsToDelete,
      });
    }

    // Upsert new and existing tags
    const tagsToUpsert = tagNames.map((tagName) => ({ articleId, tagName }));
    return await this.repository.upsertArticleTags(tagsToUpsert);
  }

  async deleteArticleTags(articleId: number) {
    return await this.repository.deleteArticleTags({ articleId });
  }
}
