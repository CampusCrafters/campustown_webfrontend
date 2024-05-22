import { Dispatch, Action } from "redux";
import axios from "axios";
import { setUsers } from "./usersSlice";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchAllUsers = () => async (dispatch: Dispatch<Action<any>>) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/user/allUsers`, {withCredentials: true});
    dispatch(setUsers(response.data));
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}