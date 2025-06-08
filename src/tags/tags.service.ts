import type { TagsRepository } from '@tags/tags.repository';

export class TagsService {
  constructor(private readonly repository: TagsRepository) {}

  async getTags() {
    const tags = await this.repository.getTags();
    return { tags: tags.map((tag) => tag.name) };
  }

  async upsertTags(tags: string[]) {
    const data = tags.map((name) => ({ name }));
    return await this.repository.upsertTags(data);
  }

  async upsertArticleTags(articleId: number, tags: string[]) {
    // TODO: use tranaction
    if (tags.length === 0) return;

    // Ensure every tag exists
    await this.upsertTags(tags);

    // Delete old tags for the artice
    const articleTags = await this.repository.getArticleTags(articleId);
    const tagsToDelete = articleTags
      .filter((tag) => !tags.includes(tag.tagName))
      .map((tag) => tag.tagName);
    if (tagsToDelete.length > 0) {
      await this.repository.deleteArticleTags({
        articleId,
        tagNames: tagsToDelete,
      });
    }

    // Upsert new and existing tags
    const tagsToUpsert = tags.map((tagName) => ({ articleId, tagName }));
    return await this.repository.upsertArticleTags(tagsToUpsert);
  }

  async deleteArticleTags(articleId: number) {
    return await this.repository.deleteArticleTags({ articleId });
  }
}
