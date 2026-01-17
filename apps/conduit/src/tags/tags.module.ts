import { Elysia } from 'elysia';
import { db } from '@/database/database.providers';
import { TagsRepository } from './tags.repository';
import { TagsService } from './tags.service';

export const setupTags = () => {
  const tagsRepository = new TagsRepository(db);
  const tagsService = new TagsService(tagsRepository);
  return new Elysia().state(() => ({
    tagsService,
  }));
};
