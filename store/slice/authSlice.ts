import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import AuthService from '@/api/auth'
import { Auth } from '@/constants/types/Auth'
import { ErrorInfo } from 'react'
import axios from 'axios'


// Define a type for the slice state => constants/types/User 


// Define the initial state using that type
const initialState: Auth = {
  userName: '',
  email: '',
  password: '',
  companyName: '',
  organisationNumber: '',
  isLogin: false,
  isAdmin: false,
}

// Login action
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(email, password);
      return response; // Response on Success
    } catch (error) {
      if (axios.isAxiosError(error)) {  // Check if error is AxiosError
        return rejectWithValue(error.response?.data); // Return error response data
      } else {
        return rejectWithValue("An unknown error occurred"); // Messages for unknown errors
      }
    } 
  }
);

// Register action for Staff
export const registerStaff = createAsyncThunk(
  'auth/registerStaff',
  async ({ username, email, password }: { username: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await AuthService.registerStaff(username, email, password);
      return response;
    } catch (error){
      if (axios.isAxiosError(error)) {  // Check if error is AxiosError
        return rejectWithValue(error.response?.data); // Return error response data
      } else {
        return rejectWithValue("An unknown error occurred"); // Messages for unknown errors
      }
    } 
  }
);

// Register action for Admin
// * here is the code


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      
    },
    logout: (state) => {
      state.isLogin = false;
      state.email = '';
      state.userName = '';
      localStorage.removeItem('user');
    },
  },
})

export const { 
  
 } = authSlice.actions


export default authSlice.reducer
