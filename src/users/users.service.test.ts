import { describe, expect, it, mock } from 'bun:test';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import type { UserInDb } from './users.schema';
import type { AuthService } from '@auth/auth.service';
import type { Database } from '@/database.providers';

describe('UsersService', () => {
  const mockUser: UserInDb = {
    id: 1,
    email: 'test@example.com',
    username: 'testuser',
    password: 'hashedpassword',
    bio: '',
    image: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  class MockUsersRepository extends UsersRepository {
    constructor() {
      super({} as Database);
    }

    override async findById() {
      return null;
    }

    override async findByEmail() {
      return null;
    }

    override async createUser() {
      return mockUser;
    }

    override async updateUser() {
      return mockUser;
    }

    override async findAll() {
      return [];
    }

    override async findByUsername() {
      return null;
    }
  }

  const mockRepository = new MockUsersRepository();
  const mockAuthService = {
    generateToken: mock(() => Promise.resolve('mock-token')),
  } as unknown as AuthService;

  const service = new UsersService(mockRepository, mockAuthService);

  describe('findById', () => {
    it('should throw NotFoundError when user is not found', async () => {
      await expect(service.findById(1)).rejects.toThrow('User not found');
    });
  });
});
