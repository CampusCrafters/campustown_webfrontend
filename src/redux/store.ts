import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projects/projectsSlice";
import myProjectsReducer from "./projects/myProjectsSlice";
import profileReducer from "./users/profileSlice";
import applicationsReducer from "./applications/applicationSlice";
import searchReducer from "./searchSlice";
import usersReducer from "./users/usersSlice";

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    myProjects: myProjectsReducer,
    profile: profileReducer,
    applications: applicationsReducer,
    search: searchReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
