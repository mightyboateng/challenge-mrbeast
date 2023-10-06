import { createSlice } from "@reduxjs/toolkit";

export const challengeSlice = createSlice({
  name: "challenges",
  initialState: {
    challengeList: [],
    challengeListLength: 0,
    challengeLastDoc: null,
    challengeFirstDoc: null,

    // -- Profile Challenges
    profileChallengeList: [],
    profileChallengeLastDoc: null,
  },
  reducers: {
    loadFirstChallengeList: (state, action) => {
      if (state.challengeList.length === 0) {
        state.challengeList = [...state.challengeList, ...action.payload];
      }
    },
    loadMoreChallengeList: (state, action) => {
      state.challengeList = [...state.challengeList, ...action.payload];
    },
    loadNewChallengeList: (state, action) => {
      state.challengeList = [ ...action.payload, ...state.challengeList];
    },
    updateLastDoc: (state, action) => {
      state.challengeLastDoc = action.payload;
    },
    updateFirstDoc: (state, action) => {
      state.challengeFirstDoc = action.payload;
    },

    // -- Profile Challenges
    loadFirstProfileChallengeList: (state, action) => {
      state.profileChallengeList = [];
      state.profileChallengeList = [
        ...state.profileChallengeList,
        ...action.payload,
      ];
    },
    loadMoreProfileChallengeList: (state, action) => {
      state.profileChallengeList = [
        ...state.profileChallengeList,
        ...action.payload,
      ];
    },
    updateProfileLastDoc: (state, action) => {
      state.profileChallengeLastDoc = action.payload;
    },
  },
});

export const {
  loadFirstChallengeList,
  loadMoreChallengeList,
  loadNewChallengeList,
  updateLastDoc,
  updateFirstDoc,
  loadFirstProfileChallengeList,
  updateProfileLastDoc,
  loadMoreProfileChallengeList,
} = challengeSlice.actions;

export default challengeSlice.reducer;
