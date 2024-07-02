import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  getProjectWithId,
} from "@/redux/projects/projectsActions";
import { useToast } from "@/components/ui/use-toast";
import {
  fetchAplicants,
  rejectApplicant,
  acceptApplicant,
  shortlistApplicant,
} from "@/redux/applications/applicationActions";

function Applicants() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project_id");
  const projectID = parseInt(projectId || "", 10);
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const projectDetails = useSelector(
    (state: RootState) => state.projects.projectDetails
  );
  const applications = useSelector(
    (state: RootState) => state.applications.applications
  );

  const [selectedAction, setSelectedAction] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (projectId) {
      const project_id = parseInt(projectId, 10);
      dispatch(getProjectWithId(project_id) as any);
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    if (projectID) {
      const applicants = dispatch(fetchAplicants(projectID) as any);
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

    if (selectedAction === action) {
      setIsDropdownOpen(!isDropdownOpen);
      setSelectedAction("");
    } else {
      setSelectedAction(action);
      setIsDropdownOpen(true);
    }
  };

  return (
    <div
      style={{
        background: "#f0f0f0",
        padding: "20px",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {projectDetails ? (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div>
            <h2 className="font-bold mt-5">Applications Recieved:</h2>
            {applications && applications.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied for
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied On
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((application: any, index: any) => (
                    <tr
                      key={index}
                      className={`${
                        application.status === "Rejected"
                          ? "bg-red-100"
                          : application.status === "Accepted"
                          ? "bg-green-100"
                          : application.status === "Shortlisted"
                          ? "bg-slate-300"
                          : ""
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {application.applicant_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {application.role_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {application.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(application.applied_on).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {application.status == "Pending" && (
                          <div className="relative">
                            <button
                              onClick={() =>
                                handleActionSelect("", application)
                              }
                              type="button"
                              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                              id="options-menu"
                              aria-haspopup="true"
                              aria-expanded="true"
                            >
                              {selectedAction === application
                                ? "Collapse"
                                : "Expand"}
                              <svg
                                className="-mr-1 ml-2 h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                {/* Icon */}
                              </svg>
                            </button>

                            {/* Dropdown menu */}
                            {isDropdownOpen &&
                              selectedAction === application && (
                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                  <div
                                    className="py-1"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="options-menu"
                                  >
                                    <button
                                      onClick={() =>
                                        handleActionSelect(
                                          "Select",
                                          application
                                        )
                                      }
                                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                      role="menuitem"
                                    >
                                      Select
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleActionSelect(
                                          "Shortlist",
                                          application
                                        )
                                      }
                                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                      role="menuitem"
                                    >
                                      Shortlist
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleActionSelect(
                                          "Reject",
                                          application
                                        )
                                      }
                                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                      role="menuitem"
                                    >
                                      Reject
                                    </button>
                                  </div>
                                </div>
                              )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No applicants currently for this project</div>
            )}
          </div>
        </div>
      ) : (
        <div>Loading Project Details...</div>
      )}
    </div>
  );
}

export default Applicants;
