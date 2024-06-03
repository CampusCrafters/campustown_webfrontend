import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { getProjectWithId, editProject } from "../redux/projectsActions";
import { fetchUserProfile } from "../redux/profileActions";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  fetchAplicants,
  rejectApplicant,
  acceptApplicant,
  shortlistApplicant,
} from "../redux/applicationActions";

interface FormValues {
  project_title: string;
  description: string;
  domain: string;
  status: string;
  start_date: string;
  end_date: string;
  link: string;
  required_roles: string[];
}

function ManageProject() {
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

  const [editMode, setEditMode] = useState(false);

  const [selectedAction, setSelectedAction] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [userProfiles, setUserProfiles] = useState<{ [key: number]: any }>({});
  const [formValues, setFormValues] = useState<FormValues>({
    project_title: "",
    description: "",
    domain: "",
    status: "",
    start_date: "",
    end_date: "",
    link: "",
    required_roles: [],
  });

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0"); // Month is zero-based
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (projectDetails) {
      setFormValues({
        project_title: projectDetails.project_title,
        description: projectDetails.description,
        domain: projectDetails.domain,
        status: projectDetails.status,
        start_date: formatDate(projectDetails.start_date),
        end_date: formatDate(projectDetails.end_date),
        link: projectDetails.link,
        required_roles: projectDetails.required_roles || [],
      });
    }
  }, [projectDetails]);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (project_id: number, formValues: FormValues) => {
    try {
      await dispatch(editProject({ project_id, projectInfo: formValues })); // Create action

      toast({
        title: "Project edited successfully",
      });
      setEditMode(false);
    } catch (err) {
      console.error("Error editing application:", err);
      toast({
        title: "Error editing Project",
        description:
          "An error occurred while editing the Project. Please try again later.",
      });
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };
  const handleReject = async (applicant: any) => {
    try {
      console.log("Rejecting applicant:", applicant);
      // Send a POST request to the backend with the applicant information
      dispatch(rejectApplicant(applicant, projectID) as any);
      // Optionally, you can update the UI or perform other actions after successful rejection
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
      // Send a POST request to the backend with the applicant information
      dispatch(acceptApplicant(applicant, projectID) as any);
      // Optionally, you can update the UI or perform other actions after successful selection
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
      // Send a POST request to the backend with the applicant information
      dispatch(shortlistApplicant(applicant, projectID) as any);
      // Optionally, you can update the UI or perform other actions after successful shortlisting
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
    // Perform different actions based on the selected action
    switch (action) {
      case "Select":
        // Handle select action
        handleSelectApplicant(applicant);
        break;
      case "Shortlist":
        // Handle shortlist action
        handleShortlist(applicant);
        break;
      case "Reject":
        // Handle reject action
        handleReject(applicant);
        break;
      default:
        break;
    }

    // Toggle dropdown visibility
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

          <div style={{ marginBottom: "20px" }}>
            <label>
              <span className="font-bold">Project Title:</span>
              <input
                type="text"
                name="project_title"
                className={`p-2 rounded-md mt-2 w-full ${
                  editMode
                    ? "border border-black bg-white"
                    : "border border-transparent bg-gray-100"
                }`}
                value={formValues.project_title}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              <span className="font-bold">Project Description:</span>
              <textarea
                name="description"
                className={`p-2 rounded-md mt-2 w-full ${
                  editMode
                    ? "border border-black bg-white"
                    : "border border-transparent bg-gray-100"
                }`}
                value={formValues.description}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              <span className="font-bold">Project Domain:</span>
              <input
                type="text"
                name="domain"
                className={`p-2 rounded-md mt-2 w-full ${
                  editMode
                    ? "border border-black bg-white"
                    : "border border-transparent bg-gray-100"
                }`}
                value={formValues.domain}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              <span className="font-bold">Project Status:</span>
              <input
                type="text"
                name="status"
                className={`p-2 rounded-md mt-2 w-full ${
                  editMode
                    ? "border border-black bg-white"
                    : "border border-transparent bg-gray-100"
                }`}
                value={formValues.status}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              <span className="font-bold">Project Start Date:</span>
              <input
                type="date"
                name="start_date"
                className={`p-2 rounded-md mt-2 w-full ${
                  editMode
                    ? "border border-black bg-white"
                    : "border border-transparent bg-gray-100"
                }`}
                value={formatDate(formValues.start_date)}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>

            <label>
              <span className="font-bold">Project End Date:</span>
              <input
                type="date"
                name="end_date"
                className={`p-2 rounded-md mt-2 w-full ${
                  editMode
                    ? "border border-black bg-white"
                    : "border border-transparent bg-gray-100"
                }`}
                value={formatDate(formValues.end_date)}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              <span className="font-bold">Project Link:</span>
              <input
                type="url"
                name="link"
                className={`p-2 rounded-md mt-2 w-full ${
                  editMode
                    ? "border border-black bg-white"
                    : "border border-transparent bg-gray-100"
                }`}
                value={formValues.link}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              <span className="font-bold">Required Roles:</span>
              <input
                type="text"
                name="required_roles"
                className={`p-2 rounded-md mt-2 w-full ${
                  editMode
                    ? "border border-black bg-white"
                    : "border border-transparent bg-gray-100"
                }`}
                value={formValues.required_roles.join(", ")}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    required_roles: value.split(",").map((role) => role.trim()),
                  }));
                }}
                disabled={!editMode}
              />
            </label>
          </div>

          <div>
            {editMode ? (
              <div>
                <AlertDialog>
                  <AlertDialogTrigger className="bg-black text-white font-bold py-2 px-4 rounded mr-2">
                    Save Changes
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You can also edit it later.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleSubmit(projectID, formValues)}
                      >
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <button
                  className="bg-red-400 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="bg-black text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleEdit}
              >
                Edit
              </button>
            )}
          </div>

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

export default ManageProject;
