// projectsActions.ts
import { Dispatch } from "redux";
import axios from "axios";
import { setProjects, setMyProjects, setProjectDetails } from "./projectsSlice";
import {
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
} from "./projectActionTypes";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchProjects = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/project/all`);
    dispatch(setProjects(response.data));
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

export const fetchMyProjects = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(
      `${backendURL}/api/v1/project/myProjects`,
      {
        withCredentials: true,
      }
    );
    dispatch(setMyProjects(response.data));
  } catch (error) {
    console.error("Error fetching my projects:", error);
  }
};

export const getProjectWithId =
  (project_id: number) => async (dispatch: Dispatch) => {
    try {
      const res = await axios.get(
        `${backendURL}/api/v1/project/${project_id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(setProjectDetails(res.data));
    } catch (err: any) {
      console.error("Error fetching project with id:", err);
      return err.response;
    }
  };

export const applyProject = async (project_id: number, role: string) => {
  try {
    const res = await axios.post(
      `${backendURL}/api/v1/project/applyProject`,
      { project_id, role },
      { withCredentials: true }
    );
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const postProject = async (project: any) => {
  try {
    const res = await axios.post(
      `${backendURL}/api/v1/project/postProject`,
      project,
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (err: any) {
    return err.response;
  }
};

export const editProject = (project: any) => async (dispatch: Dispatch) => {
  console.log("project", project);
  console.log("project_id", project.project_id);
  try {
    const res = await axios.put(
      `${backendURL}/api/v1/project/editProject?project_id=${project.project_id}`,
      project,
      { withCredentials: true }
    );
    return res;
  } catch (err: any) {
    return err.response;
  }
};

const deleteProjectRequest = () => ({
  type: DELETE_PROJECT_REQUEST,
});

const deleteProjectSuccess = (project_id: number) => ({
  type: DELETE_PROJECT_SUCCESS,
  payload: project_id,
});

const deleteProjectFailure = (error: string) => ({
  type: DELETE_PROJECT_FAILURE,
  payload: error,
});

export const deleteProject =
  (project_id: number) => async (dispatch: Dispatch) => {
    dispatch(deleteProjectRequest());
    try {
      await axios.delete(
        `${backendURL}/api/v1/project/deleteProject?project_id=${project_id}`,
        { withCredentials: true }
      );
      dispatch(deleteProjectSuccess(project_id));
      dispatch(fetchMyProjects() as any);
    } catch (error: any) {
      dispatch(deleteProjectFailure(error.message));
      console.error("Error deleting project:", error);
    }
  };
