import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { User } from '@/constants/types/UserType'


// Define a type for the slice state => constants/types/User 


// Define the initial state using that type
const initialState: User = {
  id: null,
  title : '',
  firstName : '',
  lastName : '',
  phoneNumber : '',
  email : '',
  country : '',
  city : '',
  street : '',
  postalCode : '',
  about : '',
  profileImage : '',
  roleId : 3,
  educations : [],
  skills : [],
  languages : [],
  experience : [],
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    
    
  },
})

export const { 
  
 } = userSlice.actions


export default userSlice.reducer
