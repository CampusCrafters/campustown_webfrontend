import { useEffect, useState } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/project/all')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project: any) => (
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
}

export default Projects;
