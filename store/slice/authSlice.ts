import { Staffin_API } from "@/api/API"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchFeed } from "./communitySlice";
import { ActionSheetIOS } from "react-native";


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
  message: string;
}

const initialState: AuthState = {
  userData: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  isAdmin: false,
  message: '',
};

// Sign-in
export const signin = createAsyncThunk('signin', async (params:object, thunkAPI) => {
  console.log('file: AuthSlice signin params', params)
  try{
    const response = await Staffin_API.post('Auth/login', params)
    return response.data;
    
  } catch(error:any){
    console.log('file: AuthSlice signin error', error);
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed')
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

// Sign-out
export const logout = createAsyncThunk('logout', async (_, thunkAPI) => {
  try {
    const response = await Staffin_API.post('Auth/logout'); 
    return response.data.message; // Success case
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Logout failed');
  }
});

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.isError = action.payload;
    },
  },
  extraReducers: (builder) => {
    // sign in cases
    builder.addCase(signin.pending, (state)=>{
      state.isLoading = true;
      state.isError = false;
      state.message = '';
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
      state.message = action.payload as string
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
    //Sign out
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.userData = null;
      state.isAdmin = false;
      state.message = action.payload as string; 
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
    });
  },
});

export const { setError } = AuthSlice.actions;
export default AuthSlice.reducer