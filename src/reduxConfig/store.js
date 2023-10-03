import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import challengeReducer from "./slices/challengeSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    challenges: challengeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});