import { describe, expect, it, mock } from 'bun:test';
import type { Database } from '@/database/database.providers';
import type { ProfilesService } from '@/profiles/profiles.service';
import type { TagsService } from '@/tags/tags.service';
import { ArticlesRepository } from './articles.repository';
import { ArticlesService } from './articles.service';

describe('ArticlesService', () => {
  class MockArticlesRepository extends ArticlesRepository {
    constructor() {
      super({} as Database);
    }

    override async findBySlug() {
      return null;
    }
  }

  const mockProfilesService = {
    generateProfileResponse: mock(() =>
      Promise.resolve({
        profile: {
          username: 'testuser',
          bio: '',
          image: '',
          following: false,
        },
      }),
    ),
  } as unknown as ProfilesService;

  const mockTagsService = {
    upsertArticleTags: mock(() => Promise.resolve()),
  } as unknown as TagsService;

  const service = new ArticlesService(
    new MockArticlesRepository(),
    mockProfilesService,
    mockTagsService,
  );

  describe('findBySlug', () => {
    it('should throw NotFoundError when article is not found', async () => {
      await expect(service.findBySlug('test-article')).rejects.toThrow(
        'Article not found',
      );
    });
  });
});
