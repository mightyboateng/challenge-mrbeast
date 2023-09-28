import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import challengeReducer from "./slices/challengeSlice";
import stateProviderReducer from "./slices/stateProviderSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    challenges: challengeReducer,
    stateProvider: stateProviderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});