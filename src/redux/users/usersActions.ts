import { Dispatch, Action } from "redux";
import axios from "axios";
import { setUsers, setLikedUsers, setMatchedUsers } from "./usersSlice";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const matchingServerURL = import.meta.env.VITE_MATCHING_SERVER_URL;

export const fetchAllUsers = () => async (dispatch: Dispatch<Action<any>>) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/user/allUsers`, {withCredentials: true});
    dispatch(setUsers(response.data));
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export const fetchLikedUsers = () => async (dispatch: Dispatch<Action<any>>) => {
  try {
    const response = await axios.get(`${matchingServerURL}/likedUsers`, {withCredentials: true});
    dispatch(setLikedUsers(response.data));
  } catch (error) {
    console.error("Error fetching liked users:", error);
  }
}

export const fetchMatchedUsers = () => async (dispatch: Dispatch<Action<any>>) => {
  try {
    const response = await axios.get(`${matchingServerURL}/matchedUsers`, {withCredentials: true});
    dispatch(setMatchedUsers(response.data));
  } catch (error) {
    console.error("Error fetching matches:", error);
  }
}

