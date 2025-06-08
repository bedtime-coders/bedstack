import { db } from '@/database.providers';
import { AuthService } from '@auth/auth.service';
import { ProfilesRepository } from '@profiles/profiles.repository';
import { ProfilesService } from '@profiles/profiles.service';
import { Elysia } from 'elysia';
import { CommentsRepository } from './comments.repository';
import { CommentsService } from './comments.service';

export const setupComments = () => {
  const commentsRepository = new CommentsRepository(db);
  const profilesRepository = new ProfilesRepository(db);
  const profilesService = new ProfilesService(profilesRepository);
  const commentsService = new CommentsService(
    commentsRepository,
    profilesService,
  );
  const authService = new AuthService();
  return new Elysia().state(() => ({
    commentsService,
    authService,
  }));
};
