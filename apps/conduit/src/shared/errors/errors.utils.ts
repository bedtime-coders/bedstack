import type { DrizzleQueryError } from 'drizzle-orm/errors';
import type { NotFoundError, ValidationError } from 'elysia';

// Defined temporarily until Elysia exports the type
type ElysiaCustomStatusResponse = {
  code: number;
  response: string;
};

export function isElysiaError(err: unknown): err is ElysiaCustomStatusResponse {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    'response' in err
  );
}

/**
 * Turn "/user/email" into "user.email"
 * @param path
 * @returns
 */
function parsePath(path: string): string {
  return path
    .replace(/^\//, '') // remove leading slash
    .replace(/\//g, '.') // convert slash to dot notation
    .replace(/\[(\d+)\]/g, '.$1'); // optional: convert [0] to .0
}

export function formatValidationError(error: ValidationError) {
  if (error.all.length === 0) {
    return {
      errors: {
        [error.type ?? 'body']: 'Invalid value',
      },
    };
  }
  const result: Record<string, string[]> = {};

  for (const err of error.all) {
    let path = 'general';
    if ('path' in err) {
      if (Array.isArray(err.path)) {
        path = err.path.join('.');
      } else if (typeof err.path === 'string') {
        path = parsePath(err.path);
      }
    }

    if (!path || path === '/') {
      path = 'general';
    }

    let message: string;
    if ('message' in err && typeof err.message === 'string') {
      message = err.message;
    } else if (
      'schema' in err &&
      err.schema &&
      typeof err.schema === 'object' &&
      'description' in err.schema &&
      typeof err.schema.description === 'string'
    ) {
      message = err.schema.description;
    } else if ('summary' in err && typeof err.summary === 'string') {
      message = err.summary;
    } else {
      message = 'Invalid value';
    }

    // 🧼 Remove redundant prefix: "Property 'user.image' should be ..."
    message = message.replace(/^Property '.*?' should /i, 'should ');

    if (path) {
      let messages = result[path];
      if (!messages) {
        messages = [];
        result[path] = messages;
      }
      messages.push(message);
    }
  }

  // Remove duplicates in each path’s messages
  for (const path in result) {
    result[path] = [...new Set(result[path])];
  }

  return { errors: result };
}

export function formatNotFoundError(error: NotFoundError) {
  return {
    errors: {
      [error.message.toLowerCase()]: 'not found',
    },
  };
}

export function formatDBError(error: DrizzleQueryError) {
  console.error(error);
  return {
    errors: {
      database: 'error occurred',
    },
  };
}
