import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { User, Education, Skills, Languages, Experience } from '@/constants/types/Usertype'

// Define a type for the slice state


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
    setIsAdmin : (state, action:PayloadAction<{isAdmin:boolean }>) => {
      state.roleId === 1 ? action.payload.isAdmin === true 
        : action.payload.isAdmin === false
    },
    
  },
})

export const { 
  setIsAdmin,
 } = userSlice.actions


export default userSlice.reducer
