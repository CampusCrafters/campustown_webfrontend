import { Dispatch, Action } from "redux";
import axios from "axios";
import { setUsers, setLikedUsers, setMatchedUsers } from "./usersSlice";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const matchingServerURL = import.meta.env.VITE_MATCHING_SERVER_URL;

export const fetchAllUsers = () => async (dispatch: Dispatch<Action<any>>) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/user/allUsers`, {
      withCredentials: true,
    });
    dispatch(setUsers(response.data));
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const fetchLikedUsers =
  () => async (dispatch: Dispatch<Action<any>>) => {
    try {
      const response = await axios.get(`${matchingServerURL}/likedUsers`, {
        withCredentials: true,
      });
      dispatch(setLikedUsers(response.data));
    } catch (error) {
      console.error("Error fetching liked users:", error);
    }
  };

export const fetchMatchedUsers =
  () => async (dispatch: Dispatch<Action<any>>) => {
    try {
      const response = await axios.get(`${matchingServerURL}/matchedUsers`, {
        withCredentials: true,
      });
      dispatch(setMatchedUsers(response.data));
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

export const likeUser = (user_id: number) => async () => {
  try {
    const response = await axios.get(`${matchingServerURL}/like/${user_id}`, {
      withCredentials: true,
    });
    return response.data.message;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message); // Throw an error with the message
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
