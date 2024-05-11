import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projectsSlice";
import profileReducer from "./profileSlice";

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
