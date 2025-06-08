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
};

/**
 * Domain interface for a user with authentication token
 */
export type IUserWithToken = IUser & {
  token: string;
};
