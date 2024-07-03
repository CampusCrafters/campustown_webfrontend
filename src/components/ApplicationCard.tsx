import React from "react";
import ApplicationStatus from "@/components/custom-ui/application-status-pill";
import bin from "@/assets/icons/bin.svg";
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
import { useToast } from "@/components/ui/use-toast";
import { deleteApplication } from "@/redux/applications/applicationActions";
import { useDispatch } from "react-redux";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { editApplication } from "@/redux/applications/applicationActions";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchRoles } from "@/redux/applications/applicationActions";

interface ApplicationCardProps {
  id: number;
  date: string;
  name: string;
  projectName: string;
  status: string;
  role: string;
  deleteFunction: number;
  children?: React.ReactNode;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  id,
  date,
  name,
  projectName,
  status,
  role,
  deleteFunction,
}) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { required_roles } = useSelector(
    (state: RootState) => state.applications
  );

  console.log(required_roles);

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

  const handleSubmit = async (
    project_id: number,
    role: string,
    selectedOption: string
  ) => {
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

  return (
    <article style={articleStyles}>
      <div style={leftContainerStyles}>
        <time style={dateStyles}>Applied on {date}</time>
        <p style={nameStyles}>{name}'s</p>
        <h2 style={projectNameStyles}>{projectName}</h2>
        <a href="#" style={viewProjectButtonStyles}>
          View Project
        </a>
      </div>
      <div style={rightContainerStyles}>
        <ApplicationStatus status={status} />
        <p style={roleStyles}>{role} Role</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AlertDialog>
            <AlertDialogTrigger>
              <img
                src={bin}
                alt="Edit Icon"
                style={{
                  marginRight: "20px",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your application.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(deleteFunction)}>
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Sheet>
            <SheetTrigger onClick={() => getRoles(id)}>
              <div style={editButtonStyles}>Edit Application</div>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit Application</SheetTitle>
                <SheetDescription>
                  You can change the role you've applied for but note that your
                  application will be marked as edited.
                </SheetDescription>
                <p>Project: {projectName}</p>
                <p>Applied role: {role}</p>
                <br />
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
                      <option key={role.toString()} value={role.toString()}>
                        {role.toString()}
                      </option>
                    ))}
                  </select>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 mt-3 rounded-2xl focus:outline-none focus:shadow-outline">
                    Submit
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleSubmit(id, role, selectedOption)}
                      >
                        Yes
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </article>
  );
};

export default ApplicationCard;

const articleStyles: React.CSSProperties = {
  display: "flex",
  gap: "20px",
  justifyContent: "space-between",
  color: "white",
  maxWidth: "100%",
  backgroundColor: "#151515",
  paddingLeft: "12px",
  paddingBottom: "12px",
  borderRadius: "14px",
  marginTop: "20px",
};

const leftContainerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const dateStyles: React.CSSProperties = {
  color: "#64748B",
  fontSize: "12px",
  lineHeight: "2.19",
  marginBottom: "14px",
  marginTop: "10px",
};

const nameStyles: React.CSSProperties = {
  color: "#D6D3D1",
  fontSize: "12px",
};

const projectNameStyles: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
};

const viewProjectButtonStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  padding: "8px 14px",
  fontSize: "12px",
  fontWeight: "medium",
  textTransform: "lowercase",
  borderRadius: "8px",
  border: "1px solid white",
  textDecoration: "none",
  color: "white",
  marginTop: "10px",
};

const rightContainerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const roleStyles: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "600",
  textAlign: "center",
  marginBottom: "10px",
  marginRight: "20px",
  marginTop: "20px",
};

const editButtonStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  padding: "8px 14px",
  fontSize: "12px",
  fontWeight: "medium",
  textTransform: "lowercase",
  borderRadius: "8px",
  border: "1px solid white",
  color: "white",
  marginTop: "10px",
  marginRight: "20px",
};
