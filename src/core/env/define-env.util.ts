import { env as elysiaEnv } from '@yolk-oss/elysia-env';

export const defineEnv = <T extends Parameters<typeof elysiaEnv>[0]>(
  variables: T,
) => {
  const envPlugin = elysiaEnv(variables);
  const { env } = envPlugin.decorator;

  return {
    env,
    envPlugin,
  };
};
