import { exit } from 'node:process';
import { parseArgs } from 'node:util';
import {
  articles,
  comments,
  favoriteArticles,
} from '@/articles/articles.model';
import { db } from '@/database.providers';
import { articleTags, tags } from '@/tags/tags.model';
import { userFollows, users } from '@/users/users.model';
import { reset, seed } from 'drizzle-seed';

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    reset: { type: 'boolean', default: false },
  },
  strict: true,
  allowPositionals: true,
});

if (values.reset) {
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
