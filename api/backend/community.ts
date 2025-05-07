import { values } from "lodash";
import api from "./config";
import { number } from "yup";
import { IComment } from "@/types";

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
    console.error('[get all posts] ', error)
    return []
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
    console.error('[get posts details] ', error, 'post:', postId)
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


export const updatePost = async (postId: number, values: any) => {
  try {
    const response = await api.put(`/Community/UpdatePost?postId=${postId}`, values)

    return response.data
  } catch (error) {
    console.error(error)
  }
}


// Hide Post

// Unhyde Post

// Get hidden posts

// Delete post
export const deletePost = async (postId: number) => {
  try {
    const response = await api.delete(`/Community/DeletePost?postId=${postId}`)

    return response.data
  } catch (error) {
    console.error(error)
  }
}

// Share post
export const sharePost = async (postId: number, values: any) => {
  try {
    const response = await api.post(`/Community/SharePost?postId=${postId}`, values)

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getSharesForPost = async (postId: number) => {
  try {
    const { data } = await api.get(`/Community/GetSharesForPost?postId=${postId}`)

    return data
  } catch (error) {
    console.error(error)
  }
}

export const deleteSharedPost = async (postId: number) => {
  try {
    const response = await api.delete(`/Community/DeleteSharedPost?sharedPostId=${postId}`)

    return response
  } catch (error) {
    console.error(error)
  }
}

export const reportItem = async (values: any) => {
  try {
    const response = await api.post(`/Community/ReportItem`, values)

    return response
  } catch (error) {
    console.error(error)
  }
}

export const getReportedItem = async () => {
  try {
    const {data} = await api.get(`/Community/GetReportedItem`)

    return data
  } catch (error) {
    console.error(error)
  }
}

// postResolveReport
// Create group
// Update group info

export const getAllGroups = async () => {
  try {
    const {data} = await api.get(`/Community/GetAllGroups`)

    return data
  } catch (error) {
    console.error(error)
  }
}

export const deleteGroupe = async (id: number) => {
  try {
    const response = await api.delete(`/DeleteGroup?groupId=${number}`)

    return response.data
  } catch (error) {
    console.error(error)
  }
}

// Grant admin
// Remove member from group
// Join group
// Leave group
// Get group details
// Invite to group
// Get group invites
// User groups
// Group members
// Accept invitation
// Decline invitaion
// Create group post
// Delete group post

export const likePost = async (id: number) => {
  try {
    const response = await api.post(`/Community/LikePost?postId=${id}`)

    return response.data
  } catch (error) {
    console.error('[like post]', error, 'post:', id )
  }
}

export const unlikePost = async (id: number) => {
  try {
    const response = await api.post(`/Community/UnlikePost?postId=${id}`)

    return response.data
  } catch (error) {
    console.error('[unlike post]', error, 'post:', id)
  }
}

//🚧likeSharePost
export const likeSharePost = async (id: number) => {
  try {
    const response = await api.post(`🚧`)

    return response.data
  } catch (error) {
    console.error('[LikeSharePost]', error, id);
  }
}

//🚧UnlikeSharePost
export const unlikeSharePost = async (id: number) => {
  try {
    const response = await api.post(`🚧`)

    return response.data
  } catch (error) {
    console.error('[UnlikeSharePost]', error, id);
  }
}

//🚧AddComment
export const addComment = async (id: number, values: IComment) => {
  try {
    const response = await api.post(`🚧`, values)
    
    return response.data
  } catch (error) {
    console.error('[AddComment]', error, id);
  }
}


//🚧AddCommentSharePost
export const addCommentSharePost = async (id: number, values: IComment) => {
  try {
    const response = await api.post(`🚧`, values)
    
    return response.data
  } catch (error) {
    console.error('[AddCommentSharePost]', error, id);
  }
}

//🚧DeleteComment
export const deleteComment = async (id: number) => {
  try {
    const response = await api.post(`🚧`, values)
    
    return response.data
  } catch (error) {
    console.error('[DeleteComment]', error, id);
  }
}

//🚧GetComment-post
export const getCommentPost = async (id: number) => {
  try {
    const {data} = await api.get(``)

    return data
  } catch (error) {
    console.error('[GetCommentPost]', error, id);
    
  }
}

export const getFeed = async () => {
  try {
    const {data} = await api.get(`/Community/Feed`)

    return data
  } catch (error) {
    console.error('[getFeed]', error)
    return []
  }
}

export const getGroupFeed = async (id: number) => {
  try {
    const {data} = await api.get(``)

    return data
  } catch (error) {
    console.error('[getGroupFeed]', error);
    
  }
}