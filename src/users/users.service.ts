import type { AuthService } from '@/auth/auth.service';
import { RealWorldError } from '@/shared/errors';
import type { CreateUserInput, UpdateUserInput } from '@/users/interfaces';
import type { UsersRepository } from '@/users/users.repository';
import { NotFoundError } from 'elysia';
import { StatusCodes } from 'http-status-codes';
import { toDomain, toNewUserRow, toResponse, toUpdateUserRow } from './mappers';

export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  async findById(id: number) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundError('user');
    }
    const token = await this.authService.generateToken(user);
    const domainUser = toDomain(user, token);
    return toResponse(domainUser);
  }

  private async isEmailTaken(email: string) {
    const userWithEmail = await this.repository.findByEmail(email);
    return userWithEmail !== null;
  }

  private async isUsernameTaken(username: string) {
    const userWithUsername = await this.repository.findByUsername(username);
    return userWithUsername !== null;
  }

  async createUser(input: CreateUserInput) {
    if (await this.isEmailTaken(input.email)) {
      throw new RealWorldError(StatusCodes.CONFLICT, {
        'user.email': ['already taken'],
      });
    }

    if (await this.isUsernameTaken(input.username)) {
      throw new RealWorldError(StatusCodes.CONFLICT, {
        'user.username': ['already taken'],
      });
    }

    const newUser = toNewUserRow(input);
    newUser.password = await Bun.password.hash(newUser.password);
    const createdUser = await this.repository.createUser(newUser);
    if (!createdUser) {
      throw new RealWorldError(StatusCodes.INTERNAL_SERVER_ERROR, {
        user: ['was not created'],
      });
    }
    const token = await this.authService.generateToken(createdUser);
    const domainUser = toDomain(createdUser, token);
    return toResponse(domainUser);
  }

  async updateUser(id: number, input: UpdateUserInput) {
    // Emails are unique, if the user is trying to change their email,
    // we need to check if the new email is already taken
    const currentUser = await this.repository.findById(id);
    if (!currentUser) {
      throw new NotFoundError('user');
    }
    if (input.email && input.email !== currentUser.email) {
      const userWithEmail = await this.repository.findByEmail(input.email);
      if (userWithEmail) {
        throw new RealWorldError(StatusCodes.CONFLICT, {
          'user.email': ['already taken'],
        });
      }
    }

    // Check if username is taken
    if (input.username && input.username !== currentUser.username) {
      const userWithUsername = await this.repository.findByUsername(
        input.username,
      );
      if (userWithUsername) {
        throw new RealWorldError(StatusCodes.CONFLICT, {
          'user.username': ['already taken'],
        });
      }
    }

    const userUpdate = toUpdateUserRow(input);
    if (userUpdate.password) {
      userUpdate.password = await Bun.password.hash(userUpdate.password);
    }
    const updatedUser = await this.repository.updateUser(
      currentUser.id,
      userUpdate,
    );
    if (!updatedUser) {
      throw new RealWorldError(StatusCodes.INTERNAL_SERVER_ERROR, {
        user: ['was not updated'],
      });
    }
    const token = await this.authService.generateToken(updatedUser);
    const domainUser = toDomain(updatedUser, token);
    return toResponse(domainUser);
  }

  async loginUser(email: string, password: string) {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new NotFoundError('user');
    }
    if (!(await Bun.password.verify(password, user.password))) {
      throw new RealWorldError(StatusCodes.UNAUTHORIZED, {
        'user.password': ['invalid'],
      });
    }
    const token = await this.authService.generateToken(user);
    const domainUser = toDomain(user, token);
    return toResponse(domainUser);
  }
}
