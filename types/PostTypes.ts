export interface IPost {
  postId: number;
  userId: number;
  content: string;
  authorName: string;
  images: [];
  createdAt: Date; // ISO 8601 format
  likeCount: number; // Option
  commentCount: number; // Option
  sharedCount: number; // Option
  likes: ILike[];
  comments: IComment[];
  grpupId?: number
}

export interface ILike {
  userId: number,
  authorName: string
}

export interface IComment {
  commentId: number;
  userId: number;
  authorName: string;
  content: string;
  createdAt: Date; // ISO 8601 format
}

