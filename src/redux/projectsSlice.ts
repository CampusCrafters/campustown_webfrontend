import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Project {
  project_id: string;
  project_title: string;
  description: string;
  domain: string;
  status: string;
  start_date: string;
  end_date: string;
  required_roles: string[];
  link: string;
}

interface ProjectsState {
  projects: Project[];
}

const initialState: ProjectsState = {
  projects: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
    },
  },
});

export const { setProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
