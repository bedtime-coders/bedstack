/**
 * Domain interface for a user
 */
export type IUser = {
  id: number;
  email: string;
  username: string;
  bio: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  token?: string;
};
