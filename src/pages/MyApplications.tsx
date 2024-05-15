import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { deleteApplication, fetchApplications } from "../redux/applicationActions";
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
import { useToast } from "@/components/ui/use-toast"

const MyApplications = () => {
  const { toast } = useToast()
  const dispatch = useDispatch();
  const { applications } = useSelector(
    (state: RootState) => state.applications
  );
  useEffect(() => {
    dispatch(fetchApplications() as any);
  }, [dispatch]);

  const handleDelete = async (applicationId: number) => {
    try{
      await dispatch(deleteApplication(applicationId) as any);
      toast({
        title: "Application deleted successfully",
        description: "You can no longer view this application.",
      });
    } catch{
      toast({
        title: "Error deleting application",
        description: "An error occurred while deleting the application. Please try again later.",
      });
    }
  };

  const reversedApplications = [...applications].reverse();

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
          {reversedApplications.map((application) => (
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
                <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full">
                  Edit
                </button>
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
                      <AlertDialogAction onClick={() => handleDelete(application.application_id)}>Yes</AlertDialogAction>
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