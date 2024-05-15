import { Dispatch, Action } from "redux"
import axios from "axios"
import { setApplications } from "./applicationSlice"

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchApplications = () => async (dispatch: Dispatch<Action<any>>) => {
    try {
        const response = await axios.get(`${backendURL}/api/v1/user/myApplications`, { withCredentials: true });
        dispatch(setApplications(response.data));
    } catch (error) {
        console.error("Error fetching applications:", error);
    }
};

export const deleteApplication = (applicationId: number) => async (dispatch: Dispatch<Action<any>>) => {
    try {
        await axios.delete(`${backendURL}/api/v1/project/deleteApplication`, { data: { application_id: applicationId }, withCredentials: true });
        dispatch(fetchApplications() as any);
    } catch (error) {
        console.error("Error deleting application:", error);
    }
}

