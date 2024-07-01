import { Dispatch, Action } from "redux";
import axios from "axios";
import {
  setApplications,
  setRequiredRoles,
  setApplicants,
} from "./applicationSlice";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchApplications =
  () => async (dispatch: Dispatch<Action<any>>) => {
    try {
      const response = await axios.get(
        `${backendURL}/api/v1/user/myApplications`,
        { withCredentials: true }
      );
      dispatch(setApplications(response.data));
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

export const fetchRoles =
  (project_id: number) => async (dispatch: Dispatch<Action<any>>) => {
    try {
      const response = await axios.get(
        `${backendURL}/api/v1/project/:${project_id}`,
        { withCredentials: true }
      );
      const roles = response.data.required_roles;
      dispatch(setRequiredRoles(roles));
      return roles;
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

export const editApplication =
  (project_id: number, role: string, newRole: string) =>
  async (dispatch: Dispatch<Action<any>>) => {
    try {
      await axios.put(
        `${backendURL}/api/v1/project/editApplication`,
        { project_id, role, newRole },
        { withCredentials: true }
      );
      dispatch(fetchApplications() as any);
    } catch (error) {
      console.error("Error editing application:", error);
    }
  };

export const deleteApplication =
  (applicationId: number) => async (dispatch: Dispatch<Action<any>>) => {
    try {
      await axios.delete(`${backendURL}/api/v1/project/deleteApplication`, {
        data: { application_id: applicationId },
        withCredentials: true,
      });
      dispatch(fetchApplications() as any);
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

export const fetchAplicants =
  (project_id: number) => async (dispatch: Dispatch<Action<any>>) => {
    try {
      const response = await axios.get(
        `${backendURL}/api/v1/project/projectApplicants?project_id=${project_id}`,
        { withCredentials: true }
      );
      console.log("response.data", response.data);
      dispatch(setApplicants(response.data));
      return response.data;
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

export const rejectApplicant =
  (applicant: Applicant, project_id: number) =>
  async (dispatch: Dispatch<Action<any>>) => {
    console.log("applicant", applicant);
    const { user_id, role_name } = applicant;
    console.log("application_id", user_id, "role_name", role_name);
    try {
      await axios.put(
        `${backendURL}/api/v1/project/rejectApplicant`,
        {
          user_id,
          role_name,
          project_id,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(fetchAplicants(project_id) as any);
    } catch (error) {
      console.error("Error rejecting applicant:", error);
      // Display a user-friendly error message to the user
    }
  };

export const acceptApplicant =
  (applicant: Applicant, project_id: number) =>
  async (dispatch: Dispatch<Action<any>>) => {
    const { user_id, role_name } = applicant;
    try {
      await axios.post(
        `${backendURL}/api/v1/project/acceptApplicant`,
        {
          user_id,
          role_name,
          project_id,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(fetchAplicants(project_id) as any);
    } catch (error) {
      console.error("Error accepting applicant:", error);
      // Display a user-friendly error message to the user
    }
  };

export const shortlistApplicant =
  (applicant: Applicant, project_id: number) =>
  async (dispatch: Dispatch<Action<any>>) => {
    const { user_id, role_name } = applicant;
    try {
      await axios.put(
        `${backendURL}/api/v1/project/shortlistApplicant`,
        {
          user_id,
          role_name,
          project_id,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(fetchAplicants(project_id) as any);
    } catch (error) {
      console.error("Error shortlisting applicant:", error);
      // Display a user-friendly error message to the user
    }
  };

export interface Applicant {
  application_id: number;
  user_id: number;
  applicant_name: string;
  project_id: number;
  role_name: string;
  status: string;
  applied_on: Date;
  reviewed_on: Date | null;
}
