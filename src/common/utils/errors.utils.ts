export function isHttpError(err: unknown): err is { code: number } {
  return typeof err === 'object' && err !== null && 'code' in err;
}
