export function isHttpError(err: unknown): err is { code: number } {
  return typeof err === 'object' && err !== null && 'code' in err;
}

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
