import { describe, expect, it } from 'bun:test';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const service = new AuthService();

  describe('verifyToken', () => {
    it('should throw AuthenticationError when token is invalid', async () => {
      await expect(service.verifyToken('invalid-token')).rejects.toThrow(
        'Invalid token',
      );
    });
  });
});
