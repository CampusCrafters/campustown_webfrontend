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
  deleteApplication,
  editApplication,
  fetchAplForProject,
} from "../redux/applicationActions";
import { fetchRoles } from "../redux/applicationActions";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  const { applications, required_roles } = useSelector(
    (state: RootState) => state.applications
  );
  const { searchQuery } = useSelector((state: RootState) => state.search);

  const [editMode, setEditMode] = useState(false);

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
        console.log("Profiles:", profiles);
        console.log("UserProfiles:", userProfiles);
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
    console.log("Submitting form:", formValues);
    try {
      const action = editProject({ project_id, projectInfo: formValues }); // Create action
      const resultAction = await dispatch(action); // Dispatch action and wait for it to resolve
      const projectInfo = resultAction.payload; // Access payload from the resolved action if needed
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

  useEffect(() => {
    dispatch(fetchAplForProject(projectID) as any);
  }, [dispatch]);

  const handleDelete = async (applicationId: number) => {
    try {
      await dispatch(deleteApplication(applicationId) as any);
      toast({
        title: "Application deleted successfully",
        description: "You can no longer view this application.",
      });
    } catch (err) {
      console.error("Error deleting application:", err);
      toast({
        title: "Error deleting application",
        description:
          "An error occurred while deleting the application. Please try again later.",
      });
    }
  };

  const handleSubmitApl = async (
    project_id: number,
    role: string,
    selectedOption: string
  ) => {
    //Edit Application
    try {
      await dispatch(editApplication(project_id, role, selectedOption) as any);
      toast({
        title: "Application edited successfully",
        description: "You can now view the edited application.",
      });
    } catch (err) {
      console.error("Error editing application:", err);
      toast({
        title: "Error editing application",
        description:
          "An error occurred while editing the application. Please try again later.",
      });
    }
  };

  const getRoles = async (project_id: number) => {
    try {
      await dispatch(fetchRoles(project_id) as any);
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const reversedApplications = [...applications].reverse();
  const filteredApplications = applications.filter((application) => {
    return searchQuery
      ? application.project_title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      : reversedApplications;
  });

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
          <span className="font-bold">Project Members:</span>
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
                  <AlertDialogTrigger className="bg-black  text-white font-bold py-2 px-4 rounded mr-2">
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
        </div>
      ) : (
        <div>Loading Project Details...</div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied On
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reviewed On
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredApplications.map((application) => (
              <tr key={application.application_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {application.project_title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {application.role_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {application.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(application.applied_on).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(application.reviewed_on).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Sheet>
                    <SheetTrigger
                      onClick={() => getRoles(application.project_id)}
                      className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
                    >
                      Edit
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Edit Application</SheetTitle>
                        <SheetDescription>
                          You can change the role you've applied for but note
                          that your application will be marked as edited.
                        </SheetDescription>
                        <p>Project: {application.project_title}</p>
                        <p>Applied role: {application.role_name}</p>
                        <br></br>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Select a new role
                        </label>
                        <div className="relative">
                          <select
                            id="newrole"
                            value={selectedOption}
                            onChange={handleSelectChange}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:border-gray-500 focus:ring"
                          >
                            <option value="">New Role</option>
                            {required_roles.map((role) => (
                              <option
                                key={role.toString()}
                                value={role.toString()}
                              >
                                {role.toString()}
                              </option>
                            ))}
                          </select>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger
                            className="bg-blue-500 hover:bg-blue-700 text-white
                          font-bold py-1 px-4 mt-3 rounded-2xl
                          focus:outline-none focus:shadow-outline"
                          >
                            Submit
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleSubmitApl(
                                    application.project_id,
                                    application.role_name,
                                    selectedOption
                                  )
                                }
                              >
                                Yes
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                  <AlertDialog>
                    <AlertDialogTrigger className="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-full">
                      Reject Application
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your application.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            handleDelete(application.application_id)
                          }
                        >
                          Yes
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageProject;
