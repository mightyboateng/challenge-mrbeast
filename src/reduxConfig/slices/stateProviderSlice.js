import { createSlice } from "@reduxjs/toolkit";

export const stateProviderSlice = createSlice({
  name: "stateProvikder",
  initialState: {
    theme: "dark",
  },
  reducers: {
    switchThemeData: (state, action) => {
      // const newTheme = theme === "light" ? "dark" : "light";
      state.theme = action.payload;
    },
  },
});

export const {switchThemeData} = stateProviderSlice.actions;

export default stateProviderSlice.reducer;