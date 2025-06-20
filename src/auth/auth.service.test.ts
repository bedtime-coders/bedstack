import { describe, expect, it } from 'bun:test';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const service = new AuthService();

  describe('verifyToken', () => {
    it('should throw AuthenticationError when token is invalid', () => {
      expect(() => service.verifyToken('invalid-token')).toThrow(
        '{"token":["is invalid"]}',
      );
    });
  });
});
