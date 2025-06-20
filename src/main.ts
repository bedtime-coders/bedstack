import { setupApp } from '@/app.module';
import chalk from 'chalk';
import { Elysia } from 'elysia';

console.info(chalk.gray('Starting Bedstack'));

new Elysia()
  .use(setupApp)
  .get('/', ({ redirect }) => redirect('/swagger'))
  .listen(3000, ({ hostname, port }) => {
    console.info(
      `Bedstack is up and running on ${chalk.blue(`http://${hostname}:${port}`)}`,
    );
  });
