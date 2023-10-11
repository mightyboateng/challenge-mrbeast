import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetail: null,
    userNotification: "",
    userProfile: null,
    otherProfile: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.userDetail = action.payload;
    },
    showNotificationBanner: (state, action) => {
      state.userNotification = action.payload;
    },
    updateOtherProfileDetail: (state, action) => {
      state.otherProfile = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginUser,
  updatePostTitle,
  updatePostBody,
  showNotificationBanner,
  updateOtherProfileDetail,
} = userSlice.actions;

export default userSlice.reducer;
