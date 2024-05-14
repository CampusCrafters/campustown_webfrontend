import { useState } from "react";
import { postProject } from "@/redux/projectsActions";
import { useToast } from "@/components/ui/use-toast";

const ProjectForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    project_title: "",
    domain: "",
    description: "",
    link: "",
    required_roles: [],
    start_date: "",
    end_date: "",
    status: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  //function to confirm all the fields are filled
  const validateForm = () => {
    return (
      formData.project_title &&
      formData.domain &&
      formData.description &&
      formData.required_roles.length > 0 &&
      formData.start_date &&
      formData.end_date &&
      formData.status
    );
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "required_roles") {
      const rolesArray = value.split(",").map((role: string) => role.trim());
      setFormData({
        ...formData,
        [name]: rolesArray,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsModalOpen(true);
    } else {
      toast({
        title: "Please fill all the fields",
        description: "All fields are required to post a project.",
      });
    }
  };

  const handleConfirmSubmit = async () => {
    try {
      const res = await postProject(formData);
      toast({
        title: `${res}`,
        description: `successfully posted project.`,
        //add button to redirect to the project page
      });
      setIsModalOpen(false);
      //refresh the page
    } catch (error) {
      console.error(
        `Error applying for the ${formData.project_title} project:`,
        error
      );
      toast({
        title: "Error posting for the project",
        description:
          "An error occurred while applying for the project. Please try again later.",
      });
      setIsModalOpen(false);
    }
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <form
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="project_title" className="block mb-2 font-semibold">
            Project Title:
          </label>
          <input
            placeholder="Project Title"
            type="text"
            id="project_title"
            name="project_title"
            value={formData.project_title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="domain" className="block mb-2 font-semibold">
            Domain:
          </label>
          <input
            placeholder="Web Development, Machine Learning, etc."
            type="text"
            id="domain"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 font-semibold">
            Description:
          </label>
          <textarea
            placeholder="Project Description"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="link" className="block mb-2 font-semibold">
            Link:
          </label>
          <input
            placeholder="https://example.com (Optional)"
            type="text"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="required_roles" className="block mb-2 font-semibold">
            Required Roles (comma-separated):
          </label>
          <input
            placeholder="Role1, Role2, Role3"
            type="text"
            id="required_roles"
            name="required_roles"
            value={formData.required_roles.join(", ")}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="start_date" className="block mb-2 font-semibold">
            Start Date:
          </label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="end_date" className="block mb-2 font-semibold">
            End Date:
          </label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block mb-2 font-semibold">
            Status:
          </label>
          <input
            placeholder="Open, Closed, In Progress"
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      {/* Confirmation modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className="text-lg font-semibold mb-4">Confirm Submission</p>
            <p className="mb-4">
              This action cannot be removed from history. Your profile details
              <br></br>
              will be used to apply for this project.
            </p>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded mr-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-black hover:bg-slate-700 text-white font-semibold px-4 py-2 rounded"
                onClick={handleConfirmSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
