import { describe, expect, it, mock } from 'bun:test';
import type { Database } from '@/database.providers';
import { TagsRepository } from './tags.repository';
import { TagsService } from './tags.service';

describe('TagsService', () => {
  class MockTagsRepository extends TagsRepository {
    constructor() {
      super({} as Database);
    }

    override async getTags() {
      return [];
    }
  }

  const service = new TagsService(new MockTagsRepository());

  describe('getTags', () => {
    it('should return empty tags array when no tags exist', async () => {
      const result = await service.getTags();
      expect(result).toEqual({ tags: [] });
    });
  });
});
