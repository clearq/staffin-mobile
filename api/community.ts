import { API_BASE_URL, api } from "./API";

export interface BasePost {
  postId: number;
  userId: number;
  content: string;
  authorName: string;
  image: string;
  createdAt: string; // ISO 8601 format
}

export interface Post extends BasePost {
  likeCount?: number; // Option
  commentCount?: number; // Option
  sharedCount?: number; // Option
  likes: Like[];
}

export interface PostDetail extends BasePost {
  likes: Like[];
  comments: Comment[];
}

export interface Like {
  userId: number;
  authorName: string;
}

export interface Comment {
  commentId: number;
  userId: number;
  authorName: string;
  content: string;
  createdAt: string; // ISO 8601 format
}

// Get Feed by users follow/follower
const getFeed = async (token: string) => {
  try {
    const response = await api.get(`/Community/Feed`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("GetFeed error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch feed");
  }
};

// Get post details
const getPostDetails = async (postId: number, token: string) => {
  try {
    const response = await api.get(`/Community/GetPostDetails?postId=${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("GetPostDetails error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch post details");
  }
};

// Get users posts and shares
const getUserPostsAndShares = async (userId: number, token: string) => {
  try {
    const response = await api.get(
      `/Community/GetUserPostsAndShares?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
};

export {
  getFeed,
  getPostDetails,
  getUserPostsAndShares,
}