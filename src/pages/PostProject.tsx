import { useState, ChangeEvent } from "react";
import { postProject } from "@/redux/projects/projectsActions";
import { useToast } from "@/components/ui/use-toast";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Dayjs } from "dayjs";

// Define the type for formData
interface FormData {
  project_title: string;
  domain: string;
  description: string;
  link: string;
  required_roles: string[];
  start_date: Dayjs | null;
  end_date: Dayjs | null;
  status: string;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const ProjectForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    project_title: "",
    domain: "",
    description: "",
    link: "",
    required_roles: [],
    start_date: null,
    end_date: null,
    status: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to confirm all fields are filled
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

  // Handle change function to update form data
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "required_roles") {
      // Ensure the type of required_roles is string[]
      const rolesArray = value.split(",").map((role) => role.trim());
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: rolesArray,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // Handle date change for start_date and end_date
  const handleDateChange = (name: keyof FormData) => (date: Dayjs | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: date,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  // Confirm submission handler
  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      await postProject({
        ...formData,
        start_date: formData.start_date?.toISOString() || "",
        end_date: formData.end_date?.toISOString() || "",
      });
      toast({
        title: `${formData.project_title}`,
        description: `Successfully posted project.`,
      });
      setIsModalOpen(false);
      navigate("/explore-all");
    } catch (error) {
      console.error(
        `Error applying for the ${formData.project_title} project:`,
        error
      );
      toast({
        title: "Error posting the project",
        description:
          "An error occurred while applying for the project. Please try again later.",
      });
      setIsModalOpen(false);
    }
    // redirect to the project page
  };

  // Close modal handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <form
        className="flex flex-col py-6 rounded-2xl bg-neutral-900 max-w-[400px]"
        onSubmit={handleSubmit}
      >
        <header className="self-center text-3xl font-bold text-blue-500 lowercase">
          Project
        </header>
        <main className="flex flex-col px-6 w-full">
          <div className="mt-12">
            <label className="text-base font-semibold tracking-tight leading-6 text-center text-white">
              Project Title:
            </label>
            <input
              name="project_title"
              type="text"
              className="shrink-0 mt-3.5 h-11 w-full rounded-lg bg-neutral-700 text-white px-4 py-2 " // Custom padding for horizontal and vertical
              aria-label="Project Title"
              placeholder="Project Title"
              value={formData.project_title}
              onChange={handleChange}
            />
          </div>

          <div className="mt-12">
            <label className="text-base font-semibold tracking-tight leading-6 text-center text-white  ">
              Project Description:
            </label>
            <input
              name="description"
              type="text"
              className="shrink-0 mt-3.5 h-11 w-full rounded-lg bg-neutral-700  text-white px-4 py-2"
              aria-label="Project Description"
              placeholder="Describe your project here"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <section className="flex gap-5 mt-11">
            <ThemeProvider theme={darkTheme}>
              <div className="flex flex-col flex-1">
                <label className="text-base mb-3 font-semibold tracking-tight leading-6 text-center text-white">
                  Start Date:
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={formData.start_date}
                    onChange={handleDateChange("start_date")}
                  />
                </LocalizationProvider>
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-base mb-3 font-semibold tracking-tight leading-6 text-center text-white">
                  End Date:
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={formData.end_date}
                    onChange={handleDateChange("end_date")}
                  />
                </LocalizationProvider>
              </div>
            </ThemeProvider>
          </section>
          <div className="mt-12">
            <label className="text-base font-semibold tracking-tight leading-6 text-center text-white">
              Project Link:
            </label>
            <input
              name="link"
              type="text"
              className="shrink-0 mt-3.5 h-11 w-full rounded-lg bg-neutral-700  text-white px-4 py-2"
              aria-label="Project Link"
              placeholder="hhtps://example.com"
              value={formData.link}
              onChange={handleChange}
            />
          </div>
          <div className="mt-10">
            <label className="text-base font-semibold tracking-tight leading-6 text-center text-white">
              Project Status:
            </label>
            <input
              name="status"
              type="text"
              className="shrink-0 mt-3.5 h-11 w-full rounded-lg bg-neutral-700  text-white px-4 py-2"
              aria-label="Project Status"
              placeholder="Open, Closed, In Progress"
              value={formData.status}
              onChange={handleChange}
            />
          </div>
          <div className="mt-12">
            <label className="text-base font-semibold tracking-tight leading-6 text-center text-white">
              Project Domain:
            </label>
            <input
              name="domain"
              type="text"
              className="shrink-0 mt-3.5 h-11 w-full rounded-lg bg-neutral-700  text-white px-4 py-2"
              aria-label="Project Domain"
              placeholder="Web Development, Machine Learning, etc."
              value={formData.domain}
              onChange={handleChange}
            />
          </div>
          <div className="mt-10">
            <label className="text-base font-semibold tracking-tight leading-6 text-center text-white">
              Required Roles:
            </label>
            <input
              name="required_roles"
              type="text"
              className="shrink-0 mt-3.5 h-11 w-full rounded-lg bg-neutral-700  text-white px-4 py-2"
              aria-label="Required Roles"
              placeholder="Role1, Role2, Role3"
              value={formData.required_roles.join(", ")}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-[70%] self-center hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded mt-8"
            style={{
              backgroundColor: "rgba(30, 106, 255, 1)",
            }}
          >
            Submit
          </button>
        </main>
      </form>
      {/* Confirmation modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className="text-lg font-semibold mb-4">Confirm Submission</p>
            <p className="mb-4">
              This action cannot be undone. Your profile details will be used to
              apply for this project.
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
                disabled={isSubmitting}
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
