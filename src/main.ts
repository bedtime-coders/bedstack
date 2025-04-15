import { setupApp } from '@/app.module';
import { Elysia } from 'elysia';

const app = new Elysia()
  .use(setupApp)
  .get('/', ({ redirect }) => redirect('/swagger'))
  .listen(3000);

console.log(
  `🦊 Elysia is running! Access Swagger UI at http://${app.server?.hostname}:${app.server?.port}/swagger`,
);
