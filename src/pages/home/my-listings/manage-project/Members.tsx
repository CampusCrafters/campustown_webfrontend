import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { getProjectWithId } from "@/redux/projects/projectsActions";
import { fetchUserProfile } from "@/redux/users/profileActions";

function Members() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project_id");
  const projectID = parseInt(projectId || "", 10);
  const dispatch = useDispatch<AppDispatch>();
  const projectDetails = useSelector(
    (state: RootState) => state.projects.projectDetails
  );
  const [userProfiles, setUserProfiles] = useState<{ [key: number]: any }>({});

  useEffect(() => {
    if (projectID) {
      dispatch(getProjectWithId(projectID) as any);
    }
  }, [dispatch, projectID]);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (projectDetails?.members) {
        const profiles: { [key: number]: any } = {};
        for (const member of projectDetails.members) {
          try {
            const response = (await dispatch(
              fetchUserProfile(member.user_id)
            )) as any;
            profiles[member.user_id] = response.name;
          } catch (error) {
            console.error("Error fetching user profile:", error);
          }
        }
        setUserProfiles(profiles);
      }
    };

    if (projectDetails) {
      fetchProfiles();
    }
  }, [dispatch, projectDetails]);

  return (
    <div>
      {projectDetails ? (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          {projectDetails.members && projectDetails.members.length > 0 ? (
            <div>
              <span className="font-bold">Project Members:</span>
              <table
                style={{ width: "100%", borderCollapse: "collapse" }}
                className="mb-3"
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Username
                    </th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projectDetails.members.map((member: any, index: any) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {userProfiles[member.user_id] || "Loading..."}
                      </td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {member.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>No members currently working on this project</div>
          )}
        </div>
      ) : (
        <div>Loading project details...</div>
      )}
    </div>
  );
}

export default Members;
