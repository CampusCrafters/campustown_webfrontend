import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProjectsState = {
  projects: [],
  myProjects: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
    },
    setMyProjects(state, action: PayloadAction<Project[]>) {
      state.myProjects = action.payload;
    },
  },
});

export const { setProjects, setMyProjects } = projectsSlice.actions;
export default projectsSlice.reducer;

interface Project {
  project_id: number;
  host_id: number;
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
  myProjects: Project[];
}
