import { Dispatch, Action } from "redux";
import axios from "axios";
import { setProfile, setUserProfile } from "./profileSlice";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchProfile = () => async (dispatch: Dispatch<Action<any>>) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/user/viewProfile`, {
      withCredentials: true,
    });
    dispatch(setProfile(response.data));
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

export const fetchUserProfile =
  (user_id: number) => async (dispatch: Dispatch<Action<any>>) => {
    try {
      const response = await axios.get(
        `${backendURL}/api/v1/user/profile/:${user_id}`,
        { withCredentials: true }
      );

      dispatch(setUserProfile(response.data));
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

export const uploadProfilePicture =
  (file: File) => async (dispatch: Dispatch<Action<any>>) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      await axios.post(
        `${backendURL}/api/v1/user/addProfilePicture`,
        formData,
        { withCredentials: true }
      );
      dispatch(fetchProfile() as any);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

export const deleteProfilePicture =
  () => async (dispatch: Dispatch<Action<any>>) => {
    try {
      await axios.delete(`${backendURL}/api/v1/user/deleteProfilePicture`, {
        withCredentials: true,
      });
      dispatch(fetchProfile() as any);
    } catch (error) {
      console.error("Error deleting profile picture:", error);
    }
  };
