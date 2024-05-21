import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projectsSlice";
import profileReducer from "./profileSlice";
import applicationsReducer from './applicationSlice'
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    profile: profileReducer,
    applications: applicationsReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
