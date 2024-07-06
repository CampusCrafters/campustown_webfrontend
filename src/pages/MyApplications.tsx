import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchApplications } from "../redux/applications/applicationActions";
import ApplicationCard from "@/components/ApplicationCard";

const MyApplications = () => {
  const dispatch = useDispatch();
  const { applications } = useSelector(
    (state: RootState) => state.applications
  );
  const { searchQuery } = useSelector((state: RootState) => state.search);

  useEffect(() => {
    dispatch(fetchApplications() as any);
  }, [dispatch]);

  const reversedApplications = [...applications].reverse();
  const filteredApplications = searchQuery
    ? reversedApplications.filter((application) =>
        application.project_title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : reversedApplications;

  return (
    <div className="flex flex-col">
      {filteredApplications.map((application) => (
        <ApplicationCard
          project_id={application.project_id}
          key={application.application_id}
          id={application.application_id}
          date={new Date(application.applied_on).toLocaleDateString()}
          name={application.host_name || "Loading..."}
          projectName={application.project_title}
          status={application.status}
          role={application.role_name}
        />
      ))}
    </div>
  );
};

export default MyApplications;
