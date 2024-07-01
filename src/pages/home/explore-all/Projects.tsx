import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { fetchProjects } from "../../../redux/projects/projectsActions";
import ProjectCard from "@/components/ProjectCard";

const Projects = () => {
  const dispatch = useDispatch();

  const { projects } = useSelector(
    (state: RootState) => state.projects
  );
  const { searchQuery } = useSelector((state: RootState) => state.search);

  useEffect(() => {
    dispatch(fetchProjects() as any);
  }, [dispatch]);

  const filteredProjects = projects.filter((project) => {
    return project.project_title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });
  const reversedProjects = [...filteredProjects].reverse();

  return (
    <div className="px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {reversedProjects.map((project) => (
              <ProjectCard key={project.project_id} project={project} />
            ))}
          </div>
    </div>
  );
};

export default Projects;
