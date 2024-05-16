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
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useToast } from "@/components/ui/use-toast"
import ViewMoreIcon from "@/assets/icons/ViewMoreIcon.svg";
import { useState } from "react";
import { applyProject } from "../redux/projectsActions";

const ProjectCard = ({ project }: any) => {
  const { toast } = useToast()
  const formattedStartDate = new Date(project.start_date).toLocaleDateString();
  const formattedEndDate = new Date(project.end_date).toLocaleDateString();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleApplication = async (project_id: number, project_title: string, role: any) => {
    try {
      const res = await applyProject(project_id, role);
      toast({
        title: `${res}`,
        description: `${role} role for ${project_title} project.`,
      });
    } catch (error) {
      console.error("Error applying for the project:", error);
      toast({
        title: "Error applying for the project",
        description: "An error occurred while applying for the project. Please try again later.",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-3xl font-semibold mb-2">{project.project_title}</h3>
      <p className="text-sm mb-2">{project.description}</p>
      <p className="mb-2">
        <strong>Host:</strong> {project.name}
      </p>
      <p className="mb-2">
        <strong>Domain:</strong> {project.domain}
      </p>
      <p className="mb-2">
        <strong>Status:</strong> {project.status}
      </p>
      <p className="mb-2">
        <strong>Start Date:</strong> {formattedStartDate}
      </p>
      <p className="mb-2">
        <strong>End Date:</strong> {formattedEndDate}
      </p>
      <div className="mb-2">
        <strong>Required Roles:</strong>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {project.required_roles.map((role: any) => (
            <div
              key={role}
              className={`rounded-lg p-2 text-center cursor-pointer ${
                selectedRole === role ? "bg-blue-400" : "bg-gray-200"
              }`}
              onClick={() =>
                setSelectedRole((prevRole) => (prevRole === role ? null : role))
              }
            >
              {role}
            </div>
          ))}
        </div>
      </div>
      <p className="mb-2">
        <strong>Link:</strong>{" "}
        <a href={project.link} className="text-blue-600">
          {project.link}
        </a>
      </p>
      <div className="flex items-center justify-between">
        {!selectedRole && (
          <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 opacity-50 cursor-not-allowed">
            <HoverCard>
              <HoverCardTrigger>Apply with Profile</HoverCardTrigger>
              <HoverCardContent>
                Select a role to apply
              </HoverCardContent>
            </HoverCard>
          </div>
        )}
        {selectedRole && (
          <AlertDialog>
            <AlertDialogTrigger
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Apply with Profile
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be removed from history. Your profile
                  details will be used to apply for this project.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    handleApplication(project.project_id, project.project_title, selectedRole)
                  }
                >
                  Apply
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <div className="flex items-center cursor-pointer">
          <span className="mr-2">View more</span>
          <img src={ViewMoreIcon} alt="View More" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
