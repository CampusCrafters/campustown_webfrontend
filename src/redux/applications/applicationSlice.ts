import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ApplicationState = {
  applications: [],
  required_roles: [],
};

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setApplications(state, action: PayloadAction<Application[]>) {
      state.applications = action.payload;
    },
    setRequiredRoles(state, action: PayloadAction<RequiredRoles[]>) {
      state.required_roles = action.payload;
    },
    setApplicants(state, action: PayloadAction<Application[]>) {
      state.applications = action.payload;
    },
  },
});

export const { setApplications, setRequiredRoles, setApplicants } =
  applicationSlice.actions;
export default applicationSlice.reducer;

interface Application {
  application_id: number;
  user_id: number;
  applicant_name: string;
  project_id: number;
  role_name: string;
  status: string;
  applied_on: Date;
  reviewed_on: Date;
  project_title: string;
  profile_picture: string;
  batch: number;
  host_name: string;
}

interface RequiredRoles {
  required_roles: string[];
}

interface ApplicationState {
  applications: Application[];
  required_roles: RequiredRoles[];
}
