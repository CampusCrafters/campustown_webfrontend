import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { useToast } from "@/components/ui/use-toast";
import {
  fetchAplicants,
  rejectApplicant,
  acceptApplicant,
  shortlistApplicant,
} from "@/redux/applications/applicationActions";
import ApplicantCard from "../../../../components/ApplicantCard";

function Applicants() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project_id");
  const projectID = parseInt(projectId || "", 10);
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const applications = useSelector(
    (state: RootState) => state.applications.applications
  );

  const [selectedAction, setSelectedAction] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (projectID) {
      const applicants = dispatch(fetchAplicants(projectID) as any);
      console.log("applicants", applicants);
      if (applicants) {
      }
    }
  }, [dispatch, projectID]);

  const handleReject = async (applicant: any) => {
    try {
      console.log("Rejecting applicant:", applicant);
      dispatch(rejectApplicant(applicant, projectID) as any);
      toast({
        title: "Applicant rejected successfully",
      });
    } catch (error) {
      toast({
        title: "Error rejecting applicant",
        description:
          "An error occurred while rejecting the applicant. Please try again later.",
      });
    }
  };

  const handleSelectApplicant = async (applicant: any) => {
    try {
      console.log("Selecting applicant:", applicant);
      dispatch(acceptApplicant(applicant, projectID) as any);
      toast({
        title: "Applicant selected successfully",
      });
    } catch (error) {
      toast({
        title: "Error selecting applicant",
        description:
          "An error occurred while selecting the applicant. Please try again later.",
      });
    }
  };

  const handleShortlist = async (applicant: any) => {
    try {
      console.log("Shortlisting applicant:", applicant);
      dispatch(shortlistApplicant(applicant, projectID) as any);
      toast({
        title: "Applicant shortlisted successfully",
      });
    } catch (error) {
      toast({
        title: "Error shortlisting applicant",
        description:
          "An error occurred while shortlisting the applicant. Please try again later.",
      });
    }
  };

  const handleActionSelect = (action: string, applicant: any) => {
    console.log("Action selected:", action, applicant);
    switch (action) {
      case "Select":
        handleSelectApplicant(applicant);
        break;
      case "Shortlist":
        handleShortlist(applicant);
        break;
      case "Reject":
        handleReject(applicant);
        break;
      default:
        break;
    }

    if (selectedAction === action && isDropdownOpen) {
      setIsDropdownOpen(false);
      setSelectedAction("");
    } else {
      setSelectedAction(action);
      setIsDropdownOpen(true);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {applications && applications.length > 0 ? (
        <>
          {/* Pending Applications */}
          {applications.filter(
            (application: any) => application.status === "Pending"
          ).length > 0 ? (
            applications
              .filter((application: any) => application.status === "Pending")
              .map((application: any, index: any) => (
                <ApplicantCard
                  key={index}
                  src={application.profile_picture}
                  name={application.applicant_name}
                  batch={application.batch}
                  role={application.role_name}
                  onActionSelect={(action: string) =>
                    handleActionSelect(action, application)
                  }
                  selectedAction={selectedAction}
                  isDropdownOpen={isDropdownOpen}
                  status={application.status}
                />
              ))
          ) : (
            <div className="text-white self-center">
              <p>No pending applicants for this project</p>
            </div>
          )}

          {/* Rejected Applications */}
          <div
            style={{
              backgroundColor: "#2979FF",
            }}
            className=" rounded-xl mt-4 p-4 text-center"
          >
            <p className="text-white text-lg font-bold mb-2">
              Shortlisted Applicants
            </p>
            {applications.filter(
              (application: any) => application.status === "Shortlisted"
            ).length > 0 ? (
              applications
                .filter(
                  (application: any) => application.status === "Shortlisted"
                )
                .map((application: any, index: any) => (
                  <ApplicantCard
                    key={index}
                    src={application.profile_picture}
                    name={application.applicant_name}
                    batch={application.batch}
                    role={application.role_name}
                    onActionSelect={(action: string) =>
                      handleActionSelect(action, application)
                    }
                    selectedAction={selectedAction}
                    isDropdownOpen={isDropdownOpen}
                    status={application.status}
                  />
                ))
            ) : (
              <div className=" text-white self-center">
                <p>No Shortlisted applicants for this project</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-white self-center">
          <p>No applicants currently for this project</p>
        </div>
      )}
    </div>
  );
}

export default Applicants;
