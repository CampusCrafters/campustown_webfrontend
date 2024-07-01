import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projectsSlice";
import myProjectsReducer from "./myProjectsSlice";
import profileReducer from "./profileSlice";
import applicationsReducer from "./applicationSlice";
import searchReducer from "./searchSlice";
import usersReducer from "./usersSlice";

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
