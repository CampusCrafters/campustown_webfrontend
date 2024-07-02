import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { getProjectWithId } from "@/redux/projects/projectsActions";
import MemberCard from "../../../../components/MemberCard"; 

function Members() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project_id");
  const projectID = parseInt(projectId || "", 10);
  const dispatch = useDispatch<AppDispatch>();
  const projectDetails = useSelector(
    (state: RootState) => state.projects.projectDetails
  );

  useEffect(() => {
    if (projectID) {
      dispatch(getProjectWithId(projectID) as any);
    }
  }, [dispatch, projectID]);

  return (
    <div>
      {projectDetails ? (
        <div>
          {projectDetails.members && projectDetails.members.length > 0 ? (
            <div>
              <div className="mb-3 flex flex-col gap-[12px]">
                {projectDetails.members.map((member: any) => (
                  <MemberCard
                    key={member.user_id}
                    src={member.profile_picture} 
                    name={member.name}
                    batch={member.batch} 
                    role={member.role}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-white">No members currently working on this project</div>
          )}
        </div>
      ) : (
        <div className="text-white">Loading project details...</div>
      )}
    </div>
  );
}

export default Members;
