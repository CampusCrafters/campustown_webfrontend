import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projectsSlice";
import profileReducer from "./profileSlice";
import applicationsReducer from "./applicationSlice";
import searchReducer from "./searchSlice";
import usersReducer from "./usersSlice";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    profile: profileReducer,
    applications: applicationsReducer,
    search: searchReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
