import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ApplicationState = {
    applications: [],
};

const applicationSlice = createSlice({
    name: 'applications',
    initialState,
    reducers: {
        setApplications(state, action: PayloadAction<Application[]>) {
            state.applications = action.payload;
        },
    },
});

export const { setApplications } = applicationSlice.actions;
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
}

interface ApplicationState {
    applications: Application[];
}