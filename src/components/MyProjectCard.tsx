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
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProject } from "../redux/projects/projectsActions";

const MyProjectsCard = ({ project }: any) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate(); // Get the navigate function
  const formattedStartDate = new Date(project.start_date).toLocaleDateString();
  const formattedEndDate = new Date(project.end_date).toLocaleDateString();

  const handleManageProject = async () => {
    navigate("/manageproject/editProject?project_id=" + project.project_id);
  };

  const handleDelete = async (project_id: number) => {
    try {
      await dispatch(deleteProject(project_id) as any);
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

  return (
    <div
      className="rounded-2xl shadow-lg p-6 border border-gray-700"
      style={{ backgroundColor: "#151515" }}
    >
      <div className="flex gap-2">
        <h3 className="text-3xl font-semibold mb-2 text-gray-400">{project.project_title}</h3>
      </div>
      <p className="text-sm mb-2 text-gray-400">
        <strong>Description: </strong>
        {project.description}
      </p>
      <p className="mb-2 text-gray-400">
        <strong>Domain: </strong> {project.domain}
      </p>
      <p className="mb-2 text-gray-400">
        <strong>Status: </strong> {project.status}
      </p>
      <p className="mb-2 text-gray-400">
        <strong>Start Date: </strong> {formattedStartDate}
      </p>
      <p className="mb-2 text-gray-400">
        <strong>End Date: </strong> {formattedEndDate}
      </p>
      <div className="mb-2">
        <strong className="text-gray-400">Required Roles:</strong>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {project.required_roles.map((role: any) => (
            <div key={role} className="rounded-lg p-2 text-center bg-gray-200">
              {role}
            </div>
          ))}
        </div>
      </div>
      <p className="mb-2 text-gray-400">
        <strong>Link: </strong>
        <a href={project.link} className="text-blue-600">
          {project.link}
        </a>
      </p>
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <button
            onClick={() => handleManageProject()}
            className="bg-black  text-white font-bold py-2 px-4 rounded mt-4"
          >
            Manage Project
          </button>
          <AlertDialog>
            <AlertDialogTrigger className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
              Delete Project
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your project.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(project.project_id)}
                >
                  Delete Project
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default MyProjectsCard;
