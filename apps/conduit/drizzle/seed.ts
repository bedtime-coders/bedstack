import { exit } from 'node:process';
import { parseArgs } from 'node:util';
import { reset, seed } from 'drizzle-seed';
import { articles, favoriteArticles } from '@/articles/articles.schema';
import { comments } from '@/comments/comments.schema';
import { env } from '@/core/env';
import { db } from '@/database/database.providers';
import { articleTags, tags } from '@/tags/tags.schema';
import { userFollows, users } from '@/users/users.schema';

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    reset: { type: 'boolean', default: false },
  },
  strict: true,
  allowPositionals: true,
});

if (values.reset) {
  const nodeEnv = env.NODE_ENV;
  if (!nodeEnv || !['development', 'test'].includes(nodeEnv)) {
    console.error(
      '❌ Database reset is only allowed in development or test environments.',
    );
    console.error('Current NODE_ENV:', nodeEnv || 'not set');
    exit(1);
  }

  console.log('🔄 Resetting database...');
  await reset(db, {
    users,
    articles,
    tags,
    comments,
    userFollows,
    favoriteArticles,
    articleTags,
  });
}

await seed(db, {
  users,
  articles,
  tags,
  comments,
  userFollows,
  favoriteArticles,
  articleTags,
});

exit(0);
