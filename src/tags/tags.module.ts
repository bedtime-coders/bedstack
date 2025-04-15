import { db } from '@/database.providers';
import { TagsRepository } from '@tags/tags.repository';
import { TagsService } from '@tags/tags.service';
import { Elysia } from 'elysia';

export const setupTags = () => {
  const tagsRepository = new TagsRepository(db);
  const tagsService = new TagsService(tagsRepository);
  return new Elysia().state(() => ({
    tagsService,
  }));
};
