import { setupApp } from '@/app.module';
import { Elysia } from 'elysia';

const app = new Elysia()
  .use(setupApp)
  .get('/', ({ redirect }) => redirect('/swagger'))
  .listen({
    port: 3000,
    hostname: 'localhost'
  });

console.log(
  `🦊 Elysia is running! Access Swagger UI at http://${app.server?.hostname}:${app.server?.port}/swagger`,
);
