import { Dispatch } from "redux";
import axios from "axios";

import { setEvents } from "./eventSlice";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchEvents = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/event/all`, {
        withCredentials: true,
      });
    dispatch(setEvents(response.data));
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

export const fetchMyEvents = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/event/myEvents`, {
      withCredentials: true,
    });
    dispatch(setEvents(response.data));
  } catch (error) {
    console.error("Error fetching my events:", error);
  }
};

export const getEventWithId =
  (event_id: number) => async (dispatch: Dispatch) => {
    try {
      const res = await axios.get(`${backendURL}/api/v1/event/${event_id}`, {
        withCredentials: true,
      });
      dispatch(setEvents(res.data));
      console.log("Event details:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("Error fetching event with id:", err);
      return err.response;
    }
  };

export const registerEvent = async (event_id: number) => {
  try {
    const res = await axios.post(
      `${backendURL}/api/v1/event/register`,
      { event_id },
      { withCredentials: true }
    );
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const postEvent = async (event: Event) => {
  try {
    const res = await axios.post(
      `${backendURL}/api/v1/event/create`,
      { event },
      { withCredentials: true }
    );
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const editEvent = async (event: any) => {
  try {
    const res = await axios.put(
      `${backendURL}/api/v1/event/edit?event_id=${event.event_id}`,
      { event },
      { withCredentials: true }
    );
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const deleteEvent = async (event_id: number) => {
  try {
    const res = await axios.delete(
      `${backendURL}/api/v1/event/delete?event_id=${event_id}`,
      { withCredentials: true }
    );
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};
