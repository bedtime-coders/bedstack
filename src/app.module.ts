import { articlesController } from '@/articles/articles.controller';
import { commentsController } from '@/comments/comments.controller';
import { DEFAULT_ERROR_MESSAGE } from '@/common/constants';
import { profilesController } from '@/profiles/profiles.controller';
import { tagsController } from '@/tags/tags.controller';
import { usersController } from '@/users/users.controller';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { description, title, version } from '../package.json';
import { isElysiaError } from './common/utils';

type ErrorCode =
  | 'PARSE'
  | 'VALIDATION'
  | 'NOT_FOUND'
  | 'INVALID_COOKIE_SIGNATURE'
  | 'INTERNAL_SERVER_ERROR'
  | 'UNKNOWN';

/**
 * Add all plugins to the app
 */
export const setupApp = () => {
  return new Elysia()
    .onError(({ error }) => {
      const reason = isElysiaError(error)
        ? error.response
        : DEFAULT_ERROR_MESSAGE;
      return {
        errors: {
          body: [reason],
        },
      };
    })
    .use(
      swagger({
        documentation: {
          info: { title, version, description },
          components: {
            securitySchemes: {
              tokenAuth: {
                type: 'apiKey',
                description: 'Prefix the token with "Token", e.g. "Token xxxx"',
                in: 'header',
                name: 'Authorization',
              },
            },
          },
        },
        exclude: ['/'],
        swaggerOptions: {
          persistAuthorization: true,
        },
      }),
    )
    .group('/api', (app) =>
      app
        .use(usersController)
        .use(profilesController)
        .use(articlesController)
        .use(commentsController)
        .use(tagsController),
    );
};
