import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchProjects } from "../redux/projectsActions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "@/components/ProjectCard";

const Projects = () => {
  const dispatch = useDispatch();

  const { projects } = useSelector((state: RootState) => state.projects);
  useEffect(() => {
    dispatch(fetchProjects() as any);
  }, [dispatch]);

  const reversedProjects = [...projects].reverse();

  return (
    <div className="px-4">
      <Tabs defaultValue="all-projects" className="w-full">
        <TabsList>
          <TabsTrigger value="all-projects">All Projects</TabsTrigger>
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="all-projects">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {reversedProjects.map((project) => (
              <ProjectCard key={project.project_id} project={project} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Projects;