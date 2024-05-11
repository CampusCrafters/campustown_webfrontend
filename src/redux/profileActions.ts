import { Dispatch, Action } from "redux";
import axios from "axios";
import { setProfile } from './profileSlice';

export const fetchProfile = () => async (dispatch: Dispatch<Action<any>>) => {
    try {
        const response = await axios.get("http://localhost:5000/api/v1/user/viewProfile", { withCredentials: true });
        dispatch(setProfile([response.data]));
    } catch (error) {
        console.error("Error fetching profile:", error);
    }
}
