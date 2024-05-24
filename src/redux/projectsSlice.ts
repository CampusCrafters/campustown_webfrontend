import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Project {
  project_id: number;
  host_id: number;
  host_name: string;
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
    deleteProjectSuccess(state, action: PayloadAction<number>) {
      state.projects = state.projects.filter(
        (project) => project.project_id !== action.payload
      );
      state.myProjects = state.myProjects.filter(
        (project) => project.project_id !== action.payload
      );
    },
  },
});

export const { setProjects, setMyProjects, deleteProjectSuccess } =
  projectsSlice.actions;
export default projectsSlice.reducer;
