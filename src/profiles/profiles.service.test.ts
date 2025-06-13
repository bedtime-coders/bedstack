import { describe, expect, it, mock } from 'bun:test';
import type { Database } from '@/database.providers';
import { UsersRepository } from '@users/users.repository';
import { ProfilesRepository } from './profiles.repository';
import { ProfilesService } from './profiles.service';

describe('ProfilesService', () => {
  class MockProfilesRepository extends ProfilesRepository {
    constructor() {
      super({} as Database);
    }

    override async findByUsername(_targetUsername: string) {
      return null;
    }
  }

  class MockUsersRepository extends UsersRepository {
    constructor() {
      super({} as Database);
    }
  }

  const service = new ProfilesService(
    new MockProfilesRepository(),
    new MockUsersRepository(),
  );

  describe('findByUsername', () => {
    it('should throw NotFoundError when profile is not found', async () => {
      await expect(service.findByUsername(1, 'testuser')).rejects.toThrow(
        'Profile not found',
      );
    });
  });
});
