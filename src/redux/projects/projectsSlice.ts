import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Project {
  posted_on: string | Date;
  project_id: number;
  host_id: number;
  host_name: string;
  host_profile_picture: string;
  hsot_batch: number;
  project_title: string;
  description: string;
  domain: string;
  status: string;
  start_date: string;
  end_date: string;
  link: string;
  required_roles: string[];
  members: {
    user_id: number;
    role: string;
    name: string;
    profile_picture: string;
    batch: number;
  }[];
}

interface ProjectsState {
  projects: Project[];
  myProjects: Project[];
  projectDetails: Project | null;
}

const initialState: ProjectsState = {
  projects: [],
  myProjects: [],
  projectDetails: null,
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

export const { setProjects, setProjectDetails } = projectsSlice.actions;
export default projectsSlice.reducer;
