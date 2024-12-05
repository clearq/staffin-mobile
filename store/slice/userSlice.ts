import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from '@/constants/types/UserType'
import { Staffin_API } from "@/api/API";

// Define a type for the slice state => constants/types/User 

interface UserState {
  userData: User | null;
  isLoading: boolean;
  isError: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  userData: null,
  isLoading: false,
  isError: false,
};

// Get user by id
export const fetchUser = createAsyncThunk('user', async (userId: number, thunkAPI) => {
  try {
    const response = await Staffin_API.get(`User/GetUser-id?userId=${userId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
})

export default UserSlice.reducer
