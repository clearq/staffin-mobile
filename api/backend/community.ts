import api from "./config";

// Get follower (List of users follower)
export const getFollower = async (userId: number) => {
  try {
    const {data} = await api.get(`/Community/GetFollower?userId=${userId}`)

    return data
  } catch (error) {
    console.error(error)
  }
}

// Get following (List of user is following)
export const getFollowing = async (userId: number) => {
  try {
    const {data} = await api.get(`/Community/GetFollowing?userId=${userId}`)

    return data
  } catch (error) {
    console.error(error)
  }
}

// Follow
export const follow = async (id: number) => {
  try {
    const response = await api.post(`/Community/Follow?followedId=${id}`)

    return response.data
  } catch (error) {
    console.error(error)
  }
}

// Unfollow
export const unfollow = async (id: number) => {
  try {
    const response = await api.post(`/Community/Unfollow?followedId=${id}`)

    return response.data
  } catch (error) {
    console.error(error)
  }
} 

// Get all posts
export const getAllPosts = async () => {
  try {
    const {data} = await api.get(`/Community/GetPosts`)
  
    return data
  } catch (error) {
    console.error(error)
  }
}

// Create post
export const createPost = async (values: any) => {
  try {
    const response = await api.post(`/Community/CreatePost`, values)

    return response
  } catch (error) {
    console.error(error)
  }
}

// Get a specific post's details
export const getPostDetails = async (postId: number) => {
  try {
    const {data} = await api.get(`/Community/GetPostDetails?postId=${postId}`)

    return data
  } catch (error) {
    console.error(error)
  }
}

// Get users posts and shares
export const getUserPostsAndShares = async (userId: string) => {
  try {
    const { data } = await api.get(
      `/Community/GetUserPostsAndShares?userId=${userId}`,
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

