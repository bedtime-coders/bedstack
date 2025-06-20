import { exit } from 'node:process';
import { db } from '@/database/database.providers';
import { users } from '@/users/users.schema';
import { parseArgs } from 'node:util';
import { articles, favoriteArticles } from '@/articles/articles.schema';
import { articleTags, tags } from '@/tags/tags.schema';
import { userFollows } from '@/users/users.schema';
import { reset, seed } from 'drizzle-seed';
import { comments } from '@/comments/comments.schema';

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    reset: { type: 'boolean', default: false },
  },
  strict: true,
  allowPositionals: true,
});

if (values.reset) {
  const nodeEnv = process.env.NODE_ENV;
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
