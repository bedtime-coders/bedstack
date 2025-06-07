import { setupUsers } from '@users/users.module';
import {
  InsertUserSchema,
  ReturnedUserSchema,
  UpdateUserSchema,
  UserLoginSchema,
} from '@users/users.schema';
import { Elysia } from 'elysia';

export const usersPlugin = new Elysia()
  .use(setupUsers)
  .group(
    '/users',
    {
      detail: {
        tags: ['Auth'],
      },
    },
    (app) =>
      app
        .post(
          '',
          ({ body, store }) => store.usersService.createUser(body.user),
          {
            body: InsertUserSchema,
            response: ReturnedUserSchema,
            detail: {
              summary: 'Registeration',
            },
          },
        )
        .post(
          '/login',
          ({ body, store }) =>
            store.usersService.loginUser(body.user.email, body.user.password),
          {
            body: UserLoginSchema,
            response: ReturnedUserSchema,
            detail: {
              summary: 'Authentication',
            },
          },
        ),
  )
  .group('/user', { detail: { tags: ['Auth'] } }, (app) =>
    app
      .get(
        '',
        async ({ request, store }) =>
          store.usersService.findById(
            await store.authService.getUserIdFromHeader(request.headers),
          ),
        {
          beforeHandle: app.store.authService.requireLogin,
          response: ReturnedUserSchema,
          detail: {
            summary: 'Get Current User',
            security: [
              {
                tokenAuth: [],
              },
            ],
          },
        },
      )
      .put(
        '',
        async ({ request, store, body }) =>
          store.usersService.updateUser(
            await store.authService.getUserIdFromHeader(request.headers),
            body.user,
          ),
        {
          body: UpdateUserSchema,
          beforeHandle: app.store.authService.requireLogin,
          response: ReturnedUserSchema,
          detail: {
            summary: 'Update User',
            security: [
              {
                tokenAuth: [],
              },
            ],
          },
        },
      ),
  );
