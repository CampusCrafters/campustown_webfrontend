import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchProjects } from "../redux/projectsActions";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);

  useEffect(() => {
    dispatch(fetchProjects() as any); // Update the type of fetchProjects to be compatible with dispatch
  }, [dispatch]);

  const reversedProjects = [...projects].reverse(); // Reverse the order of the projects array

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {reversedProjects.map((project) => (
          <div key={project.project_id} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">{project.project_title}</h3>
            <p className="mb-2"><strong>Description:</strong> {project.description}</p>
            <p className="mb-2"><strong>Domain:</strong> {project.domain}</p>
            <p className="mb-2"><strong>Status:</strong> {project.status}</p>
            <p className="mb-2"><strong>Start Date:</strong> {new Date(project.start_date).toLocaleDateString()}</p>
            <p className="mb-2"><strong>End Date:</strong> {new Date(project.end_date).toLocaleDateString()}</p>
            <p className="mb-2"><strong>Required Roles:</strong> {project.required_roles.join(', ')}</p>
            <p className="mb-2"><strong>Link:</strong> <a href={project.link} className="text-blue-600">{project.link}</a></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
