import { swagger } from '@elysiajs/swagger';
import { DrizzleQueryError } from 'drizzle-orm/errors';
import { Elysia, NotFoundError, ValidationError } from 'elysia';
import { pick } from 'radashi';
import { articlesController } from '@/articles/articles.controller';
import { commentsController } from '@/comments/comments.controller';
import { profilesController } from '@/profiles/profiles.controller';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/constants';
import {
  formatDBError,
  formatNotFoundError,
  formatValidationError,
  isElysiaError,
  RealWorldError,
} from '@/shared/errors';
import { tagsController } from '@/tags/tags.controller';
import { usersController } from '@/users/users.controller';
import { description, title, version } from '../package.json';

/**
 * Add all plugins to the app
 */
export const setupApp = () => {
  return new Elysia()
    .onError(({ error, code, set }) => {
      // Manually thrown errors
      if (error instanceof RealWorldError) {
        set.status = error.status;
        return pick(error, ['errors']);
      }
      // Elysia validation errors (ArkType based)
      if (error instanceof ValidationError) {
        return formatValidationError(error);
      }

      // Elysia not found errors
      if (error instanceof NotFoundError) {
        return formatNotFoundError(error);
      }

      // db errors
      if (error instanceof DrizzleQueryError) {
        return formatDBError(error);
      }

      // Generic error message
      const reason = isElysiaError(error)
        ? error.response
        : DEFAULT_ERROR_MESSAGE;

      console.error(error);

      return {
        errors: {
          [code]: [reason],
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
        scalarVersion: '1.31.10',
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
