import { Elysia } from 'elysia';
import { TagsResponseDto } from './dto';
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
      response: TagsResponseDto,
      detail: {
        summary: 'Get Tags',
        description: 'Get all tags',
        responses: {
          200: {
            description: 'List of tags',
            content: {
              'application/json': {
                schema: TagsResponseDto,
              },
            },
          },
        },
      },
    }),
);
