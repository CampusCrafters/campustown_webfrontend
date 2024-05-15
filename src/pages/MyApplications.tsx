import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchApplications } from "../redux/applicationActions";

const MyApplications = () => {
  const dispatch = useDispatch();

  // Fetch applications from Redux store
  const { applications } = useSelector((state: RootState) => state.applications);

  // Fetch applications when component mounts
  useEffect(() => {
    dispatch(fetchApplications() as any);
  }, [dispatch]);

  return (
    <div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Project Title</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Role</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Status</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Applied On</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Reviewed On</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.application_id}>
              <td style={{ border: "1px solid black", padding: "8px" }}>{application.project_title}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{application.role_name}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{application.status}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{new Date(application.applied_on).toLocaleString()}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{new Date(application.reviewed_on).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyApplications;
