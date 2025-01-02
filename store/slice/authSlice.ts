import { Staffin_API } from "../../api/API";
import { User } from "../../api/user";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthResponse {
  token: string;
  id: number;
  role: number;
}

export interface AdminAuth {
  auth: AuthResponse;
  companyUserId: number;
}


export interface AuthState {
  user: User | null
  authUser : AuthResponse | null
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  authUser: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Thunks
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await Staffin_API.post<AuthResponse>("/Auth/login", { email, password });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const signUpStaff = createAsyncThunk(
  "auth/signUpStaff",
  async (
    { userName, email, password }: { userName: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await Staffin_API.post<AuthResponse>("/Auth/register/staff", {
        userName,
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "SignUp failed");
    }
  }
);

export const signUpAdmin = createAsyncThunk(
  "auth/signUpAdmin",
  async (
    {
      companyName,
      organisationNumber,
      email,
      password,
    }: { companyName: string; organisationNumber: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await Staffin_API.post<AuthResponse>("/Auth/register/admin", {
        companyName,
        organisationNumber,
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "SignUp failed");
    }
  }
);

// export const getCurrentUser = createAsyncThunk(
//   "auth/getCurrentUser",
//   async (userId: number, thunkAPI) => {
//     try {
//       const response = await Staffin_API.get<User>(`/User/GetUser-id?userId=${userId}`);
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch current user");
//     }
//   }
// );

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await Staffin_API.post('/Auth/logout'); 
    return response.data.message; // Success case
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to logout");
  }
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authUser = {
        id: action.payload.id,
        token: action.payload.token,
        role: action.payload.role,
      };
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Sign Up Staff
    builder.addCase(signUpStaff.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signUpStaff.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authUser = {
        id: action.payload.id,
        token: action.payload.token,
        role: action.payload.role,
      };
      state.isAuthenticated = true;
    });
    builder.addCase(signUpStaff.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Sign Up Admin
    builder.addCase(signUpAdmin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signUpAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authUser = {
        id: action.payload.id,
        token: action.payload.token,
        role: action.payload.role,
      };
      state.isAuthenticated = true
    });
    builder.addCase(signUpAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })

    // Current User
    // builder.addCase(getCurrentUser.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getCurrentUser.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.user = action.payload;
    // });
    // builder.addCase(getCurrentUser.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload as string;
    // })

    // Logout
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.authUser = null;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })
  }
});

export default authSlice.reducer;