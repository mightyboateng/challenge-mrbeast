import { createSlice } from "@reduxjs/toolkit";

export const challengeSlice = createSlice({
  name: "challenges",
  initialState: {
    challengeList: [],
    challengeListLength: 0,
  },
  reducers: {
    loadFirstChallengeList: (state, action) => {
      if (state.challengeList.length === 0) {
        console.log("changes");
        state.challengeList = [...state.challengeList, ...action.payload];
        state.challengeListLength = state.challengeList.length;
        console.log("changes with length ", state.challengeListLength);
      }
    },
    loadMoreChallengeList: (state, action) => {
      state.challengeList = [...state.challengeList, ...action.payload];
      state.challengeListLength = state.challengeList.length;
    },
  },
});

export const {
  loadFirstChallengeList,
  loadMoreChallengeList,
} = challengeSlice.actions;

export default challengeSlice.reducer;
