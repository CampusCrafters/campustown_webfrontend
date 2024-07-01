// projectsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Project {
  project_id: number;
  project_title: string;
  description: string;
  domain: string;
  status: string;
  start_date: string;
  end_date: string;
  link: string;
  required_roles: string[];
  members: { user_id: number; role: string }[];
}

interface ProjectsState {
  projects: Project[];
  myProjects: Project[];
  projectDetails: Project | null; // Add projectDetails to the state
}

const initialState: ProjectsState = {
  projects: [],
  myProjects: [],
  projectDetails: null, // Initialize projectDetails
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
    },
    setProjectDetails(state, action: PayloadAction<Project>) {
      state.projectDetails = action.payload;
    },
  },
});

export const { setProjects, setProjectDetails } =
  projectsSlice.actions;
export default projectsSlice.reducer;
