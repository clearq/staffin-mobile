import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Staffin_API } from "@/api/API";
import { RootState } from "../store";
import { act } from "react-test-renderer";

interface Comment {
  commentId: number | null;
  userId: number | null;
  firstName: string;
  lastName: string;
  content: string;
  createdAt: string
}

interface likesUser {
  userId: number;
  firstName: string;
  lastName: null;
}

interface Post {
  postId: number;
  content: string;
  authorName: string;
  image: string | null;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  sharedCount: number;
  likes: likesUser[];
  isLiked: boolean;
}

interface FeedState {
  posts: Post[];
  comments: {[postId: number]: Comment[]}
  isLoading: boolean;
  isError: boolean;
  comment:Comment
}

const initialState: FeedState = {
  posts: [],
  comments: {},
  isLoading: false,
  isError: false,
  comment: {
    commentId: null,
    userId: null,
    firstName: "",
    lastName: "",
    content: "",
    createdAt: ""
  }
};


// Action to retrieve data from the feeds of all users you follow
export const fetchFeed = createAsyncThunk('feed/fetchFeed', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const token = state.auth.userData?.token;
  const userId = state.auth.userData?.id;

  try {
    const response = await Staffin_API.get('/Community/Feed', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const posts = response.data;
    const likedPost = posts.map((post: Post) => ({
      ...post,
      isLiked: post.likes.some((like: likesUser) => like.userId === userId)
    }));
    return likedPost;

  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Action to retrieve comments for a specific post
export const fetchComments = createAsyncThunk('feed/fetchComments', async ( params: {postId: number, comment:{}} , thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const token = state.auth.userData?.token;

  try {
    const response = await Staffin_API.get(`/Community/GetComment-Post?postId=${params.postId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return {postId: params.postId, comments: response.data};
  } catch(error) {
    return thunkAPI.rejectWithValue(error);
  };
});

// Action to add a comment to a post
export const addPostComment = createAsyncThunk('feed/addComment', async (
  params:{
    postId:number, 
    comment:string
  }, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const token = state.auth.userData?.token;
  console.log('Token:', token);

  try{
    const response = await Staffin_API.post(`/Community/AddComment?postId=${params.postId}`,
      { content: params.comment,
        firstName: "",
        lastName: "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
      }     
    });
    return response.data;
  } catch(error:any) {
    console.error('Error adding comment:', error.message);
    console.error('Error details:', error.response?.data || error);
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  };
})

// Like a post
export const likePost = createAsyncThunk('feed/likePost', async (postId: number, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const token = state.auth.userData?.token;

  try {
    await Staffin_API.post(`/Community/LikePost?postId=${postId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return postId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Unlike a post
export const unlikePost = createAsyncThunk('feed/unlikePost', async (postId: number, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const token = state.auth.userData?.token;

  try {
    await Staffin_API.post(`/Community/UnlikePost?postId=${postId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return postId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


// Slice
const CommunitySlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFeed.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    })
    builder.addCase(fetchFeed.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.isError = false
    })
    builder.addCase(fetchFeed.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    })
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      const { postId, comments } = action.payload;
      state.comments[postId] = comments;
    })
    .addCase(addPostComment.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addPostComment.fulfilled, (state, action) => {
      state.isLoading = false;
      const newComment = action.payload;
      const postId = newComment.postId; 
      if (!state.comments[postId]) {
        state.comments[postId] = [];
      }
      state.comments[postId].push(newComment);
    })
    .addCase(addPostComment.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log('Error adding comment:', action.payload); 
    })
    // Like Post
    .addCase(likePost.fulfilled, (state, action) => {
      const postId = action.payload;
      const post = state.posts.find(p => p.postId === postId);
      if (post) {
        post.isLiked = true;
        post.likeCount += 1;
      }
    })
    // Unlike Post
    .addCase(unlikePost.fulfilled, (state, action) => {
      const postId = action.payload;
      const post = state.posts.find(p => p.postId === postId);
      if (post) {
        post.isLiked = false;
        post.likeCount -= 1;
      }
    });
  },
});

export default CommunitySlice.reducer;