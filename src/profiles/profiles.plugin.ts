import { setupProfiles } from '@profiles/profiles.module';
import { ReturnedProfileSchema } from '@profiles/profiles.schema';
import { Elysia } from 'elysia';

export const profilesPlugin = new Elysia().use(setupProfiles).group(
  '/profiles/:username',
  {
    detail: {
      tags: ['Profiles'],
    },
  },
  (app) =>
    app
      .get(
        '',
        async ({ params, store, request }) =>
          store.profilesService.findByUsername(
            await store.authService.getUserIdFromHeader(request.headers),
            params.username,
          ),
        {
          beforeHandle: app.store.authService.requireLogin,
          response: ReturnedProfileSchema,
          detail: {
            summary: 'Get Profile',
            security: [
              {
                tokenAuth: [],
              },
            ],
          },
        },
      )
      .post(
        '/follow',
        async ({ params, store, request }) =>
          store.profilesService.followUser(
            params.username,
            await store.authService.getUserIdFromHeader(request.headers),
          ),
        {
          beforeHandle: app.store.authService.requireLogin,
          response: ReturnedProfileSchema,
          detail: {
            summary: 'Follow user',
            security: [
              {
                tokenAuth: [],
              },
            ],
          },
        },
      )

      .delete(
        '/follow',
        async ({ params, store, request }) =>
          store.profilesService.unfollowUser(
            params.username,
            await store.authService.getUserIdFromHeader(request.headers),
          ),
        {
          beforeHandle: app.store.authService.requireLogin,
          response: ReturnedProfileSchema,
          detail: {
            summary: 'Unfollow user',
            security: [
              {
                tokenAuth: [],
              },
            ],
          },
        },
      ),
);
