import { Elysia } from 'elysia';
import { StatusCodes } from 'http-status-codes';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
  UserResponseDto,
} from '@/users/dto';
import { setupUsers } from '@/users/users.module';

/**
 * Users controller handling user registration, authentication, and profile management
 * following the RealWorld API specification.
 */
export const usersController = new Elysia()
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
          async ({ body, store, status }) => {
            const user = await store.usersService.createUser(body.user);
            return status(StatusCodes.CREATED, user);
          },
          {
            body: CreateUserDto,
            response: {
              [StatusCodes.CREATED]: UserResponseDto,
            },
            detail: {
              summary: 'Registration',
              description: 'Register a new user',
            },
          },
        )
        .post(
          '/login',
          ({ body, store }) =>
            store.usersService.loginUser(body.user.email, body.user.password),
          {
            body: LoginUserDto,
            response: UserResponseDto,
            detail: {
              summary: 'Authentication',
              description: 'Login for existing user',
            },
          },
        ),
  )
  .group(
    '/user',
    {
      detail: {
        tags: ['User'],
      },
    },
    (app) =>
      app
        .get(
          '',
          async ({ request, store }) =>
            store.usersService.findById(
              await store.authService.getUserIdFromHeader(request.headers),
            ),
          {
            beforeHandle: app.store.authService.requireLogin,
            response: UserResponseDto,
            detail: {
              summary: 'Get Current User',
              description: 'Get the current user profile',
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
            body: UpdateUserDto,
            beforeHandle: app.store.authService.requireLogin,
            response: UserResponseDto,
            detail: {
              summary: 'Update User',
              description: 'Update user information for current user',
              security: [
                {
                  tokenAuth: [],
                },
              ],
            },
          },
        ),
  );
