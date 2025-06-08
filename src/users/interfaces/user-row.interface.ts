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
