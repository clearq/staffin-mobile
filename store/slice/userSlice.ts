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
    setProfileImage: (state, action: PayloadAction<string>) => {
      state.profileImage = action.payload;
    },
  },
});

export const { setProfileImage } = userSlice.actions;
export default userSlice.reducer;