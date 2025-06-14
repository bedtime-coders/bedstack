import { setupTags } from '@tags/tags.module';
import { ListTagsResponseSchema } from '@tags/tags.schema';
import { Elysia } from 'elysia';

export const tagsPlugin = new Elysia().use(setupTags).group(
  '/tags',
  {
    detail: {
      tags: ['Tags'],
    },
  },
  (app) =>
    app.get('/', async ({ store }) => store.tagsService.getTags(), {
      response: ListTagsResponseSchema,
      detail: {
        summary: 'Get Tags',
      },
    }),
);
