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
            summary: 'Profile',
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
            await store.authService.getUserIdFromHeader(request.headers),
            params.username,
          ),
        {
          beforeHandle: app.store.authService.requireLogin,
          response: ReturnedProfileSchema,
          detail: {
            summary: 'Follow Profile',
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
            await store.authService.getUserIdFromHeader(request.headers),
            params.username,
          ),
        {
          beforeHandle: app.store.authService.requireLogin,
          response: ReturnedProfileSchema,
          detail: {
            summary: 'Unfollow Profile',
            security: [
              {
                tokenAuth: [],
              },
            ],
          },
        },
      ),
);
