import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchApplications } from "../redux/applications/applicationActions";
import { getProjectWithId } from "../redux/projects/projectsActions";
import ApplicationCard from "@/components/ApplicationCard";

const MyApplications = () => {
  const dispatch = useDispatch();
  const { applications } = useSelector(
    (state: RootState) => state.applications
  );
  const { searchQuery } = useSelector((state: RootState) => state.search);

  const [hostNames, setHostNames] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    dispatch(fetchApplications() as any);
  }, [dispatch]);

  useEffect(() => {
    const fetchHostNames = async () => {
      const hostNamePromises = applications.map(async (application) => {
        try {
          const project_info = await dispatch(
            getProjectWithId(application.project_id) as any
          );
          return {
            id: application.project_id,
            hostName: project_info.host_name,
          };
        } catch (err) {
          console.error("Error fetching project info:", err);
          return { id: application.project_id, hostName: "Unknown" };
        }
      });

      const hostNameResults = await Promise.all(hostNamePromises);
      const hostNameMap = hostNameResults.reduce((acc: any, curr) => {
        acc[curr.id] = curr.hostName;
        return acc;
      }, {});
      setHostNames(hostNameMap);
    };

    if (applications.length > 0) {
      fetchHostNames();
    }
  }, [applications, dispatch]);

  const reversedApplications = [...applications].reverse();
  const filteredApplications = applications.filter((application) => {
    return searchQuery
      ? application.project_title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      : reversedApplications;
  });

  return (
    <div className="flex flex-col">
      {filteredApplications.map((application) => (
        <ApplicationCard
          key={application.application_id}
          id={application.application_id}
          date={new Date(application.applied_on).toLocaleDateString()}
          name={hostNames[application.project_id] || "Loading..."}
          projectName={application.project_title}
          status={application.status}
          role={application.role_name}
        />
      ))}
    </div>
  );
};

export default MyApplications;
