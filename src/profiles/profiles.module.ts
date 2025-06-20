import { Elysia } from 'elysia';
import { AuthService } from '@/auth/auth.service';
import { db } from '@/database/database.providers';
import { ProfilesRepository } from '@/profiles/profiles.repository';
import { ProfilesService } from '@/profiles/profiles.service';

export const setupProfiles = () => {
  const profilesRepository = new ProfilesRepository(db);
  const profilesService = new ProfilesService(profilesRepository);
  const authService = new AuthService();
  return new Elysia().state(() => ({ profilesService, authService }));
};
