import { setupArticles } from '@articles/articles.module';
import { Elysia, t } from 'elysia';
import {
  ArticleResponseDto,
  CreateArticleDto,
  ListArticlesQueryDto,
  ListArticlesResponseDto,
  UpdateArticleDto,
} from './dto';
import { CommentResponseDto, CreateCommentDto } from '@comments/dto';

export const articlesController = new Elysia().use(setupArticles).group(
  '/articles',
  {
    detail: {
      tags: ['Articles'],
    },
  },
  (app) =>
    app
      .get(
        '/',
        async ({ query, store, request }) =>
          store.articlesService.find({
            ...query,
            currentUserId: await store.authService.getOptionalUserIdFromHeader(
              request.headers,
            ),
          }),
        {
          query: ListArticlesQueryDto,
          response: ListArticlesResponseDto,
          detail: {
            summary: 'List Articles',
          },
        },
      )
      .post(
        '/',
        async ({ body, request, store }) =>
          store.articlesService.createArticle(
            body.article,
            await store.authService.getUserIdFromHeader(request.headers),
          ),
        {
          beforeHandle: app.store.authService.requireLogin,
          body: CreateArticleDto,
          response: ArticleResponseDto,
          detail: {
            summary: 'Create Article',
            security: [
              {
                tokenAuth: [],
              },
            ],
          },
        },
      )
      .get(
        '/feed',
        async ({ query, store, request }) =>
          store.articlesService.find({
            ...query,
            currentUserId: await store.authService.getUserIdFromHeader(
              request.headers,
            ),
            followedAuthors: true,
          }),
        {
          beforeHandle: app.store.authService.requireLogin,
          query: ListArticlesQueryDto,
          response: ListArticlesResponseDto,
          detail: {
            summary: 'Artifle Feed',
            security: [
              {
                tokenAuth: [],
              },
            ],
          },
        },
      )
      .get(
        '/:slug',
        async ({ params, store, request }) =>
          store.articlesService.findBySlug(
            params.slug,
            await store.authService.getOptionalUserIdFromHeader(
              request.headers,
            ),
          ),
        {
          response: ArticleResponseDto,
          detail: {
            summary: 'Get Article',
          },
        },
      )
      .put(
        '/:slug',
        async ({ params, body, store, request }) =>
          store.articlesService.updateArticle(
            params.slug,
            body.article,
            await store.authService.getUserIdFromHeader(request.headers),
          ),
        {
          beforeHandle: app.store.authService.requireLogin,
          body: UpdateArticleDto,
          response: ArticleResponseDto,
          detail: {
            summary: 'Update Article',
            security: [
              {
                tokenAuth: [],
              },
            ],
          },
        },
      )
      .delete(
        '/:slug',
        async ({ params, store, request }) => {
          await store.articlesService.deleteArticle(
            params.slug,
            await store.authService.getUserIdFromHeader(request.headers),
          );
        },
        {
          beforeHandle: app.store.authService.requireLogin,
          detail: {
            summary: 'Delete Article',
            security: [
              {
                tokenAuth: [],
              },
            ],
          },
        },
      )
      .post(
        '/:slug/comments',
        async ({ body, params, store, request }) => {
          const comment = await store.commentsService.createComment(
            params.slug,
            body.comment,
            await store.authService.getUserIdFromHeader(request.headers),
          );
          return { comment };
        },
        {
          beforeHandle: app.store.authService.requireLogin,
          body: CreateCommentDto,
          response: CommentResponseDto,
          detail: {
            summary: 'Add Comment to Article',
          },
        },
      )
      .get(
        '/:slug/comments',
        async ({ params, store, request }) => {
          const userId = await store.authService.getOptionalUserIdFromHeader(
            request.headers,
          );
          return {
            comments: await store.commentsService.getComments(
              params.slug,
              userId === null ? undefined : userId,
            ),
          };
        },
        {
          response: t.Object({
            comments: t.Array(CommentResponseDto),
          }),
          detail: {
            summary: 'Get Comments from Article',
          },
        },
      )
      .delete(
        '/:slug/comments/:id',
        async ({ params, store, request }) => {
          await store.commentsService.deleteComment(
            params.slug,
            Number.parseInt(params.id, 10),
            await store.authService.getUserIdFromHeader(request.headers),
          );
        },
        {
          beforeHandle: app.store.authService.requireLogin,
          params: t.Object({
            slug: t.String(),
            id: t.String(),
          }),
          detail: {
            summary: 'Delete Comment',
          },
        },
      )
      .post(
        '/:slug/favorite',
        async ({ params, store, request }) =>
          store.articlesService.favoriteArticle(
            params.slug,
            await store.authService.getUserIdFromHeader(request.headers),
          ),
        {
          beforeHandle: app.store.authService.requireLogin,
          response: ArticleResponseDto,
          detail: {
            summary: 'Favorite Article',
            security: [
              {
                tokenAuth: [],
              },
            ],
          },
        },
      )
      .delete(
        '/:slug/favorite',
        async ({ params, store, request }) =>
          store.articlesService.unfavoriteArticle(
            params.slug,
            await store.authService.getUserIdFromHeader(request.headers),
          ),
        {
          beforeHandle: app.store.authService.requireLogin,
          response: ArticleResponseDto,
          detail: {
            summary: 'Unfavorite Article',
            security: [
              {
                tokenAuth: [],
              },
            ],
          },
        },
      ),
);
