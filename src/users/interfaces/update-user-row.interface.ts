import type { UserRow } from './user-row.interface';

/**
 * Type for updating a user in the database
 */
export type UpdateUserRow = Partial<
  Omit<UserRow, 'id' | 'createdAt' | 'updatedAt'>
>;
