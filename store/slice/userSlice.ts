import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  profileImage: string;
};

const initialState: UserState = {
  profileImage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  //  add action for bookmark, 
  },
});

export const {  } = userSlice.actions;
export default userSlice.reducer;