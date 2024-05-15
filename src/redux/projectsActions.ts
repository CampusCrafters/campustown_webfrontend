import { Dispatch, Action } from "redux";
import axios from "axios";
import { setProjects, setMyProjects } from "./projectsSlice";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchProjects = () => async (dispatch: Dispatch<Action<any>>) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/project/all`);
    dispatch(setProjects(response.data));
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

export const fetchMyProjects = () => async (dispatch: Dispatch<Action<any>>) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/project/myProjects`, {
      withCredentials: true,
    });
    dispatch(setMyProjects(response.data));
  } catch (error) {
    console.error("Error fetching my projects:", error);
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
      { withCredentials: true }
    );
    return res;
  } catch (err: any) {
    return err.response;
  }
};
