export type IComment = {
  id: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
};
