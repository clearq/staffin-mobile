import { Staffin_API } from "@/api/API"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  userData: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
}

// Sign in
export const signin = createAsyncThunk('signin', async (params:object, thunkAPI) => {
  console.log('file: AuthSlice signin params', params)
  try{
    const response = await Staffin_API.post('Auth/login', params)
    console.log('file: AuthSlice signin response', response);
    return response.data;
    
  } catch(error){
    console.log('file: AuthSlice signin error', error);
    return thunkAPI.rejectWithValue(error)
  }
})

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // sign in cases
    builder.addCase(signin.pending, (state)=>{
      state.isLoading = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userData = action.payload;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    })
  },
});

export default AuthSlice.reducer