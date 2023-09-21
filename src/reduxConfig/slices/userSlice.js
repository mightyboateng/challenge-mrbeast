import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    // userDetail: {
    //   uid: "12334",
    //   displayName: "Nana Adams",
    //   emailAddress: "nana@gmail.com",
    //   photoURL:
    //     "https://media.licdn.com/dms/image/C4E03AQF2tjggYTtRHQ/profile-displayphoto-shrink_200_200/0/1647454209200?e=1685577600&v=beta&t=TJwUBDogSudhCVUWy5XZY2lxIkZV0yTTRtdH03py9Yo",
    // },
    userDetail: null,
    userCreatePost: { postTitle: "", postBody: "" },
  },
  reducers: {
    loginUser: (state, action) => {
      state.userDetail = action.payload;
    },
    updatePostTitle:(state,action)=>{
      state.userCreatePost.postTitle = action.payload
    },
    updatePostBody:(state,action)=>{
      state.userCreatePost.postBody = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { loginUser,updatePostTitle,updatePostBody } = userSlice.actions;

export default userSlice.reducer;
