import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchApplications } from "../redux/applicationActions";

const MyApplications = () => {
  const dispatch = useDispatch();

  const {applications} = useSelector((state: RootState) => state.applications);
  useEffect(() => {
    dispatch(fetchApplications() as any);
  }, [dispatch]);
  
  return (
    <div>MyApplications</div>
  )
}

export default MyApplications

