import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { users } from '../users.model';

/**
 * Database row type for a user
 */
export type UserRow = InferSelectModel<typeof users>;
export type NewUserRow = InferInsertModel<typeof users>;
export type UpdateUserRow = Partial<
  Omit<UserRow, 'id' | 'createdAt' | 'updatedAt'>
>;
