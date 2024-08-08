import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  getProjectWithId,
  editProject,
} from "@/redux/projects/projectsActions";
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

function EditProject() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project_id");
  const projectID = parseInt(projectId || "", 10);
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const projectDetails = useSelector(
    (state: RootState) => state.projects.projectDetails
  );

  const [editMode, setEditMode] = useState(false);

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

  return (
    <div className=" flex flex-col rounded-2xl bg-neutral-900 py-6 px-6">
      <div style={{ marginBottom: "20px" }}>
        <div>
          <label className="text-base font-semibold tracking-tight text-center text-white">
            Project Name:
          </label>
          <input
            type="text"
            name="project_title"
            className={`shrink-0 mt-3.5 h-11 w-full rounded-lg bg-neutral-700 text-white px-4 py-2  ${
              editMode
                ? "border-2 border-blue-500"
                : "border border-transparent bg-gray-100"
            }`}
            value={formValues.project_title}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div className="mt-5">
          <label className="text-base font-semibold tracking-tight text-center text-white">
            Project Description:
          </label>
          <textarea
            name="description"
            className={`shrink-0 mt-3.5 w-full rounded-lg bg-neutral-700  text-white px-4 py-2 ${
              editMode
                ? "border-2 border-blue-500"
                : "border border-transparent bg-gray-100"
            }`}
            value={formValues.description}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div className="mt-5">
          <label className="text-base font-semibold tracking-tight leading-6 text-center text-white">
            Project Domain:
          </label>
          <input
            type="text"
            name="domain"
            className={`shrink-0 mt-3.5 h-11 w-full rounded-lg bg-neutral-700  text-white px-4 py-2" ${
              editMode
                ? "border-2 border-blue-500"
                : "border border-transparent bg-gray-100"
            }`}
            value={formValues.domain}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div className="mt-5">
          <label className="text-base font-semibold tracking-tight leading-6 text-center text-white">
            Project Status:
          </label>
          <input
            type="text"
            name="status"
            className={`shrink-0 mt-3.5 h-11 w-full rounded-lg bg-neutral-700 text-white px-4 py-2 ${
              editMode
                ? "border-2 border-blue-500"
                : "border border-transparent bg-gray-100"
            }`}
            value={formValues.status}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div className="mt-5">
          <label className="text-base mb-3 font-semibold tracking-tight leading-6 text-center text-white">
            Start Date:
          </label>
          <input
            type="date"
            name="start_date"
            className={`shrink-0 mt-3.5 h-11 w-full rounded-lg bg-neutral-700 text-white px-4 py-2 ${
              editMode
                ? "border-2 border-blue-500"
                : "border border-transparent bg-gray-100"
            }`}
            value={formatDate(formValues.start_date)}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="mt-5">
          <label className="text-base mb-3 font-semibold tracking-tight leading-6 text-center text-white">
            End Date:
          </label>
          <input
            type="date"
            name="end_date"
            className={`shrink-0 mt-3.5 h-11 w-full rounded-lg bg-neutral-700 text-white px-4 py-2 ${
              editMode
                ? "border-2 border-blue-500"
                : "border border-transparent bg-gray-100"
            }`}
            value={formatDate(formValues.end_date)}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div className="mt-5">
          <label className="text-base mb-3 font-semibold tracking-tight leading-6 text-center text-white">
            Project Link:
          </label>
          <input
            type="url"
            name="link"
            className={`shrink-0 mt-3.5 h-11 w-full rounded-lg bg-neutral-700  text-white px-4 py-2 ${
              editMode
                ? "border-2 border-blue-500"
                : "border border-transparent bg-gray-100"
            }`}
            value={formValues.link}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div className="mt-5">
          <label className="text-base font-semibold tracking-tight leading-6 text-center text-white">
            Required Roles:
          </label>
          <input
            type="text"
            name="required_roles"
            className={`shrink-0 mt-3.5 h-11 w-full rounded-lg bg-neutral-700  text-white px-4 py-2 ${
              editMode
                ? " border-2 border-blue-500 "
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
        </div>
      </div>

      <div>
        {editMode ? (
          <div>
            <AlertDialog>
              <AlertDialogTrigger
                style={{
                  backgroundColor: "rgba(30, 106, 255, 1)",
                }}
                className=" text-white font-bold py-2 px-6   rounded-xl mr-2"
              >
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
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-xl"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            style={{
              backgroundColor: "rgba(30, 106, 255, 1)",
            }}
            className="w-[50%] self-center hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-xl"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default EditProject;
