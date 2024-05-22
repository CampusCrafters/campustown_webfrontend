import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  editApplication,
  deleteApplication,
  fetchApplications,
  fetchRoles,
} from "../redux/applicationActions";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";

const MyApplications = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { applications, required_roles } = useSelector(
    (state: RootState) => state.applications
  );
  const { searchQuery } = useSelector((state: RootState) => state.search);

  useEffect(() => {
    dispatch(fetchApplications() as any);
  }, [dispatch]);

  const handleDelete = async (applicationId: number) => {
    try {
      await dispatch(deleteApplication(applicationId) as any);
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

  const handleSubmit = async (
    project_id: number,
    role: string,
    selectedOption: string
  ) => {
    //Edit Application
    try {
      await dispatch(editApplication(project_id, role, selectedOption) as any);
      toast({
        title: "Application edited successfully",
        description: "You can now view the edited application.",
      });
    } catch (err) {
      console.error("Error editing application:", err);
      toast({
        title: "Error editing application",
        description:
          "An error occurred while editing the application. Please try again later.",
      });
    }
  };

  const getRoles = async (project_id: number) => {
    try {
      await dispatch(fetchRoles(project_id) as any);
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const reversedApplications = [...applications].reverse();
  const filteredApplications = applications.filter((application) => {
    return searchQuery
      ? application.project_title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      : reversedApplications;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Project Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Applied On
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reviewed On
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredApplications.map((application) => (
            <tr key={application.application_id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {application.project_title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {application.role_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {application.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(application.applied_on).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(application.reviewed_on).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Sheet>
                  <SheetTrigger
                    onClick={() => getRoles(application.project_id)}
                    className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
                  >
                    Edit
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit Application</SheetTitle>
                      <SheetDescription>
                        You can change the role you've applied for but note that
                        your application will be marked as edited.
                      </SheetDescription>
                      <p>Project: {application.project_title}</p>
                      <p>Applied role: {application.role_name}</p>
                      <br></br>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Select a new role
                      </label>
                      <div className="relative">
                        <select
                          id="newrole"
                          value={selectedOption}
                          onChange={handleSelectChange}
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:border-gray-500 focus:ring"
                        >
                          <option value="">New Role</option>
                          {required_roles.map((role) => (
                            <option
                              key={role.toString()}
                              value={role.toString()}
                            >
                              {role.toString()}
                            </option>
                          ))}
                        </select>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger
                          className="bg-blue-500 hover:bg-blue-700 text-white
                          font-bold py-1 px-4 mt-3 rounded-2xl
                          focus:outline-none focus:shadow-outline"
                        >
                          Submit
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleSubmit(
                                  application.project_id,
                                  application.role_name,
                                  selectedOption
                                )
                              }
                            >
                              Yes
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
                <AlertDialog>
                  <AlertDialogTrigger className="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-full">
                    Delete
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your application.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(application.application_id)}
                      >
                        Yes
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyApplications;
