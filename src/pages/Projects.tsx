import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchProjects } from "../redux/projectsActions";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);

  useEffect(() => {
    dispatch(fetchProjects() as any);
  }, [dispatch]);

  const reversedProjects = [...projects].reverse();

  return (
    <div className="px-4">
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="all-projects">All Projects</TabsTrigger>
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="all-projects">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {reversedProjects.map((project) => (
          <div
            key={project.project_id}
            className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
          >
            <h3 className="text-3xl font-semibold mb-2">
              {project.project_title}
            </h3>
            <p className="text-sm mb-2">{project.description}</p>
            <p className="mb-2">
              <strong>Domain:</strong> {project.domain}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {project.status}
            </p>
            <p className="mb-2">
              <strong>Start Date:</strong>{" "}
              {new Date(project.start_date).toLocaleDateString()}
            </p>
            <p className="mb-2">
              <strong>End Date:</strong>{" "}
              {new Date(project.end_date).toLocaleDateString()}
            </p>
            <div className="mb-2">
              <strong>Required Roles:</strong>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {project.required_roles.map((role) => (
                  <div
                    key={role}
                    className="bg-gray-200 rounded-lg p-2 text-center"
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
            <AlertDialog>
              <AlertDialogTrigger className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
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
                  <AlertDialogAction>Apply</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>

    </div>
  );
};

export default Projects;
