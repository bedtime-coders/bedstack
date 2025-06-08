/**
 * Database row type for a user
 */
export type UserRow = {
  id: number;
  email: string;
  username: string;
  bio: string;
  image: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Type for creating a new user in the database
 */
export type NewUserRow = Omit<UserRow, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Type for updating a user in the database
 */
export type UpdateUserRow = Partial<
  Omit<UserRow, 'id' | 'createdAt' | 'updatedAt'>
>;
