import { describe, expect, it, mock } from 'bun:test';
import type { Database } from '@/database/database.providers';
import { UsersRepository } from '@/users/users.repository';
import { ProfilesRepository } from './profiles.repository';
import { ProfilesService } from './profiles.service';

describe('ProfilesService', () => {
  class MockProfilesRepository extends ProfilesRepository {
    constructor() {
      super({} as Database);
    }

    override async findProfileByUsername(_targetUsername: string) {
      return null;
    }
  }

  class MockUsersRepository extends UsersRepository {
    constructor() {
      super({} as Database);
    }
  }

  const service = new ProfilesService(new MockProfilesRepository());

  describe('findByUsername', () => {
    it('should throw NotFoundError when profile is not found', () => {
      expect(() => service.findProfileByUsername(1, 'testuser')).toThrow(
        'profile',
      );
    });
  });
});
