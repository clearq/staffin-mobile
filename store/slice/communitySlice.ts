import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Staffin_API } from "@/api/API";
import { RootState } from "../store";

interface Comment {
  commentId: number;
  userId: number;
  firstName: string;
  lastName: string;
  content: string;
  createdAt: string;
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
}

interface FeedState {
  posts: Post[];
  comments: {[postId: number]: Comment[]}
  isLoading: boolean;
  isError: boolean;
}

const initialState: FeedState = {
  posts: [],
  comments: {},
  isLoading: false,
  isError: false,
};

// Action to retrieve data from feeds
export const fetchFeed = createAsyncThunk('feed/fetchFeed', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const token = state.auth.userData?.token;

  try {
    const response = await Staffin_API.get('/Community/Feed', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Action to retrieve comments for a specific post
export const fetchComments = createAsyncThunk('feed/fetchComments', async (postId: number, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const token = state.auth.userData?.token;

  try {
    const response = await Staffin_API.get(`/Community/GetComment-Post?postId=${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return {postId, comments: response.data};
  } catch(error) {
    return thunkAPI.rejectWithValue(error);
  };
});

const CommunitySlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
      })
      builder.addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      builder.addCase(fetchFeed.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.comments[postId] = comments;
      })
  },
});

export default CommunitySlice.reducer;