import { profileResponseSchema } from '@profiles/dto';
import { toResponse } from '@profiles/mappers';
import { setupProfiles } from '@profiles/profiles.module';
import { Elysia } from 'elysia';

export const profilesController = new Elysia().use(setupProfiles).group(
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
        async ({ params, store, request }) => {
          const profile = await store.profilesService.findProfileByUsername(
            await store.authService.getUserIdFromHeader(request.headers),
            params.username,
          );
          return toResponse(profile);
        },
        {
          beforeHandle: app.store.authService.requireLogin,
          response: profileResponseSchema,
          detail: {
            summary: 'Get Profile',
            description:
              'Get a profile of a user of the system. Auth is required.',
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
        async ({ params, store, request }) => {
          const profile = await store.profilesService.followUser(
            params.username,
            await store.authService.getUserIdFromHeader(request.headers),
          );
          return toResponse(profile);
        },
        {
          beforeHandle: app.store.authService.requireLogin,
          response: profileResponseSchema,
          detail: {
            summary: 'Follow user',
            description: 'Follow a user by username. Auth is required.',
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
        async ({ params, store, request }) => {
          const profile = await store.profilesService.unfollowUser(
            params.username,
            await store.authService.getUserIdFromHeader(request.headers),
          );
          return toResponse(profile);
        },
        {
          beforeHandle: app.store.authService.requireLogin,
          response: profileResponseSchema,
          detail: {
            summary: 'Unfollow user',
            description: 'Unfollow a user by username. Auth is required.',
            security: [
              {
                tokenAuth: [],
              },
            ],
          },
        },
      ),
);
