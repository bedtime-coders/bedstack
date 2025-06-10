import { articlesController } from '@/articles/articles.controller';
import { usersController } from '@/users/users.controller';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { description, title, version } from '../package.json';
import { commentsController } from './comments/comments.controller';
import { profilesController } from './profiles/profiles.controller';
import { tagsController } from './tags/tags.controller';

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
    .onError(({ code, error, set }) => {
      // Map error codes to status codes
      const statusMap: Record<ErrorCode, number> = {
        PARSE: 400,
        VALIDATION: 422,
        NOT_FOUND: 404,
        INVALID_COOKIE_SIGNATURE: 401,
        INTERNAL_SERVER_ERROR: 500,
        UNKNOWN: 500,
      };

      // Set status code based on error code
      set.status = statusMap[code as ErrorCode] ?? 500;

      // Return error response in the expected format
      return {
        errors: {
          body: [error instanceof Error ? error.message : 'An error occurred'],
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
