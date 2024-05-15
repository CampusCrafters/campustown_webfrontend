import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projectsSlice";
import profileReducer from "./profileSlice";
import applicationsReducer from './applicationSlice'

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    profile: profileReducer,
    applications: applicationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
