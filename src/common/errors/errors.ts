import { DEFAULT, MapWithDefault } from '@/common/utils';
import { Elysia } from 'elysia';

export class AuthenticationError extends Error {
  public status = 401;
  public type = 'authentication';
  constructor(public message: string) {
    super(message);
  }
}

export class AuthorizationError extends Error {
  public status = 403;
  public type = 'authorization';
  constructor(public message: string) {
    super(message);
    this.name = 'AuthorizationError';
  }
}

export class BadRequestError extends Error {
  public status = 400;
  public type = 'bad_request';
  constructor(public message: string) {
    super(message);
    this.name = 'BadRequestError';
  }
}

export class ConflictError extends Error {
  public status = 409;
  public type = 'conflict';
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

const ERROR_CODE_STATUS_MAP = new MapWithDefault<string | symbol, number>([
  ['PARSE', 400],
  ['BAD_REQUEST', 400],
  ['VALIDATION', 422],
  ['NOT_FOUND', 404],
  ['INVALID_COOKIE_SIGNATURE', 401],
  ['AUTHENTICATION', 401],
  ['AUTHORIZATION', 403],
  ['CONFLICT', 409],
  ['INTERNAL_SERVER_ERROR', 500],
  ['UNKNOWN', 500],
  [DEFAULT, 500],
]);

export function getErrorStatusFromCode(code: string | number): number {
  return (
    ERROR_CODE_STATUS_MAP.get(code.toString()) ??
    ERROR_CODE_STATUS_MAP.get(DEFAULT)
  );
}

export const errorHandler = new Elysia().onError(({ code, error, set }) => {
  if (error instanceof AuthenticationError) {
    set.status = 401;
    return { errors: { body: [error.message] } };
  }

  if (error instanceof AuthorizationError) {
    set.status = 403;
    return { errors: { body: [error.message] } };
  }

  if (error instanceof BadRequestError) {
    set.status = 400;
    return { errors: { body: [error.message] } };
  }

  if (error instanceof ConflictError) {
    set.status = 409;
    return { errors: { body: [error.message] } };
  }

  set.status = 500;
  return {
    errors: {
      body: ['message' in error ? error.message : 'Internal server error'],
    },
  };
});
