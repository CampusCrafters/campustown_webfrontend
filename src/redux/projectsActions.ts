import { Dispatch } from "redux";
import axios from "axios";
import { setProjects } from "./projectsSlice";
import { AnyAction } from "@reduxjs/toolkit";

export const fetchProjects = () => async (dispatch: Dispatch<AnyAction>) => {
    try {
        const response = await axios.get("http://localhost:5000/api/v1/project/all");
        dispatch(setProjects(response.data));
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
};
