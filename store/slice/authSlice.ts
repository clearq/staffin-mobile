import { Staffin_API } from "@/api/API"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface UserData {
  token: string;
  id: number;
  role: number;
}

interface AuthState {
  userData: UserData | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isAdmin: boolean;
}

const initialState: AuthState = {
  userData: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  isAdmin: false,
};

// Sign-in
export const signin = createAsyncThunk('signin', async (params:object, thunkAPI) => {
  console.log('file: AuthSlice signin params', params)
  try{
    const response = await Staffin_API.post('Auth/login', params)
    return response.data;
    
  } catch(error){
    console.log('file: AuthSlice signin error', error);
    return thunkAPI.rejectWithValue(error)
  }
})

// Sign-up as staff
export const signupStaff = createAsyncThunk('signupStaff', async (params: { userName: string, email: string, password: string }, thunkAPI) => {
  try {
    const response = await Staffin_API.post('Auth/register/staff', params);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Sign-up as admin
export const signupAdmin = createAsyncThunk('signupAdmin', async (params: { companyName: string, organisationNumber: string, email: string, password: string }, thunkAPI) => {
  try {
    const response = await Staffin_API.post('Auth/register/admin', params);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

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
      state.isAdmin = action.payload.role === 1;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    // sign up as staff cases
    builder.addCase(signupStaff.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signupStaff.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userData = action.payload;state.isAdmin = state.isAdmin = action.payload.role === 1;
    });
    builder.addCase(signupStaff.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    // sign up as admin cases
    builder.addCase(signupAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signupAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userData = action.payload;
      state.isAdmin = action.payload.role === 1;
    });
    builder.addCase(signupAdmin.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default AuthSlice.reducer