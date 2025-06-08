import { Elysia } from 'elysia';
import { ListTagsResponseSchema } from './dto/tag-response.dto';
import { setupTags } from './tags.module';

export const tagsController = new Elysia().use(setupTags).group(
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
        description: 'Get all tags',
        responses: {
          200: {
            description: 'List of tags',
            content: {
              'application/json': {
                schema: ListTagsResponseSchema,
              },
            },
          },
        },
      },
    }),
);
