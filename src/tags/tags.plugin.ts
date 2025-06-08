import { Elysia } from 'elysia';
import { tagsController } from './tags.controller';

export const tagsPlugin = new Elysia().use(tagsController);
