import { type } from 'arktype';
import { Elysia } from 'elysia';
import { StatusCodes } from 'http-status-codes';
import { setupComments } from './comments.module';
import {
  CommentResponseDto,
  CommentsResponseDto,
  CreateCommentDto,
} from './dto';
import { toCommentResponse, toCommentsResponse } from './mappers';

export const commentsController = new Elysia().use(setupComments).group(
  '/articles/:slug/comments',
  {
    detail: {
      tags: ['Comments'],
    },
  },
  (app) =>
    app
      .post(
        '/',
        async ({ body, params, store, request, status }) => {
          const comment = await store.commentsService.createComment(
            params.slug,
            body.comment,
            await store.authService.getUserIdFromHeader(request.headers),
          );
          return status(StatusCodes.CREATED, toCommentResponse(comment));
        },
        {
          beforeHandle: app.store.authService.requireLogin,
          body: CreateCommentDto,
          response: {
            [StatusCodes.CREATED]: CommentResponseDto,
            [StatusCodes.UNAUTHORIZED]: type({
              errors: 'Record<string, string[]>',
            }),
          },
          detail: {
            summary: 'Add Comments to an Article',
            description: 'Authentication required, returns the created Comment',
            security: [
              {
                tokenAuth: [],
              },
            ],
          },
        },
      )
      .get(
        '/',
        async ({ params, store, request }) => {
          const userId = await store.authService.getOptionalUserIdFromHeader(
            request.headers,
          );
          const comments = await store.commentsService.getComments(
            params.slug,
            userId === null ? undefined : userId,
          );
          return toCommentsResponse(comments);
        },
        {
          response: CommentsResponseDto,
          detail: {
            summary: 'Get Comments from an Article',
            description: 'Authentication optional, returns multiple comments',
          },
        },
      )
      .delete(
        '/:id',
        async ({ params, store, request, set }) => {
          await store.commentsService.deleteComment(
            params.slug,
            params.id,
            await store.authService.getUserIdFromHeader(request.headers),
          );
          set.status = StatusCodes.NO_CONTENT;
        },
        {
          beforeHandle: app.store.authService.requireLogin,
          params: type({
            slug: 'string',
            id: 'string.numeric.parse',
          }),
          response: {
            [StatusCodes.NO_CONTENT]: type('undefined'),
          },
          detail: {
            summary: 'Delete Comment',
            description: 'Authentication required',
            security: [
              {
                tokenAuth: [],
              },
            ],
          },
        },
      ),
);
