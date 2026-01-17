import { t } from 'elysia';
import { defineEnv } from '@/core/env/define-env.util';

export default defineEnv({
  POSTGRES_DB: t.String({
    default: 'conduit',
  }),
  POSTGRES_USER: t.String({
    default: 'postgres',
  }),
  POSTGRES_PASSWORD: t.String({
    default: 'postgres',
  }),
  POSTGRES_HOST: t.String({
    default: '0.0.0.0',
  }),
  POSTGRES_PORT: t.Number({
    min: 1,
    max: 65535,
    default: 5432,
  }),
  JWT_ALGORITHM: t.String(),
  PORT: t.Number({
    min: 1,
    max: 65535,
    default: 3000,
  }),
  JWT_SECRET: t.String(),
  NODE_ENV: t.Union(
    [t.Literal('development'), t.Literal('production'), t.Literal('test')],
    {
      default: 'development',
    },
  ),
  LOG_LEVEL: t.Union([t.Literal('debug'), t.Literal('info')], {
    default: 'info',
  }),
});
