import type { UserRow } from './user-row.interface';

/**
 * Type for creating a new user in the database
 */
export type NewUserRow = Omit<UserRow, 'id' | 'createdAt' | 'updatedAt'>;
