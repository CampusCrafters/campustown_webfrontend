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
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import default_pfp from "../assets/images/default-pfp.jpg";
import { useToast } from "@/components/ui/use-toast";
import ViewMoreIcon from "@/assets/icons/ViewMoreIcon.svg";
import { useState } from "react";
import { applyProject } from "../redux/projectsActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchUserProfile } from "@/redux/profileActions";

const ProjectCard = ({ project }: any) => {
  const dispatch = useDispatch();
  const userProfile = useSelector(
    (state: RootState) => state.profile.userProfile
  );

  const { toast } = useToast();
  const formattedStartDate = new Date(project.start_date).toLocaleDateString();
  const formattedEndDate = new Date(project.end_date).toLocaleDateString();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleApplication = async (
    project_id: number,
    project_title: string,
    role: any
  ) => {
    try {
      const res = await applyProject(project_id, role);
      toast({
        title: `${res}`,
        description: `${role} role for ${project_title} project.`,
      });
    } catch (error) {
      console.error("Error applying for the project:", error);
      toast({
        title: "Error applying for the project",
        description:
          "An error occurred while applying for the project. Please try again later.",
      });
    }
  };

  const getUserProfile = async (user_id: number) => {
    try {
      await dispatch(fetchUserProfile(user_id) as any);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const filteredProfile: { [key: string]: any } | null = userProfile
    ? { ...userProfile }
    : null;
  if (filteredProfile) {
    delete filteredProfile.user_id;
    delete filteredProfile.profile_picture;
    delete filteredProfile.name;
    delete filteredProfile.email;
    delete filteredProfile.batch;
    delete filteredProfile.branch;
    delete filteredProfile.rollnumber;
  }

  return (
    <div className="rounded-2xl shadow-lg p-6 border border-gray-700" style={{backgroundColor: '#151515'}}>
      <div className="flex gap-2">
        <Sheet>
          <SheetTrigger>
            <Avatar className="cursor-pointer">
              {project.profile_picture ? (
                <AvatarImage
                  src={project.profile_picture}
                  onClick={() => getUserProfile(project.host_id)}
                />
              ) : (
                <AvatarFallback onClick={() => getUserProfile(project.host_id)}>
                  CC
                </AvatarFallback>
              )}
            </Avatar>
          </SheetTrigger>
          <SheetContent side={"bottom"} className="w-full h-[80vh] bg-gray-900">
            <SheetHeader>
              <SheetTitle>
                <div className="flex items-center mb-6">
                  <img
                    src={userProfile?.profile_picture || default_pfp}
                    alt="Profile Picture"
                    className="h-24 w-24 rounded-full mr-6 border-4 border-white shadow-lg"
                  />
                  <div>
                    <h1 className="text-3xl font-semibold text-white">
                      {userProfile?.name || "Name"}
                    </h1>
                    <p className="text-gray-400">
                      {userProfile?.email || "Email"}
                    </p>
                    <div className="flex gap-2">
                      <div className="inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-4 text-sm font-semibold shadow-md">
                        {userProfile?.batch || "Batch"}
                      </div>
                      <div className="inline-block rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-4 text-sm font-semibold shadow-md">
                        {userProfile?.branch || "Branch"}
                      </div>
                    </div>
                  </div>
                </div>
              </SheetTitle>
              <SheetDescription>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(filteredProfile || {}).map(([key, value]) => (
                    <div
                      key={key}
                      className="border border-gray-700 p-4 rounded-lg shadow-md bg-gray-800"
                    >
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {key}
                      </h3>
                      {Array.isArray(value) ? (
                        <ul>
                          {value.map((item, index) => (
                            <li key={index} className="text-gray-400">
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-400">{value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <h3 className="text-3xl font-semibold text-white mb-2">
          {project.project_title}
        </h3>
      </div>
      <p className="text-gray-400 mb-2">{project.description}</p>
      <p className="text-gray-400 mb-2">
        <strong>Host:</strong> {project.name}
      </p>
      <p className="text-gray-400 mb-2">
        <strong>Domain:</strong> {project.domain}
      </p>
      <p className="text-gray-400 mb-2">
        <strong>Status:</strong> {project.status}
      </p>
      <p className="text-gray-400 mb-2">
        <strong>Start Date:</strong> {formattedStartDate}
      </p>
      <p className="text-gray-400 mb-2">
        <strong>End Date:</strong> {formattedEndDate}
      </p>
      <div className="mb-2">
        <strong className="text-white">Required Roles:</strong>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {project.required_roles.map((role: any) => (
            <div
              key={role}
              className={`rounded-lg p-2 text-center cursor-pointer ${
                selectedRole === role ? "bg-blue-400" : "bg-gray-600"
              } text-white`}
              onClick={() =>
                setSelectedRole((prevRole) => (prevRole === role ? null : role))
              }
            >
              {role}
            </div>
          ))}
        </div>
      </div>
      <p className="text-gray-400 mb-2">
        <strong>Link:</strong>{" "}
        <a href={project.link} className="text-blue-400">
          {project.link}
        </a>
      </p>
      <div className="flex items-center justify-between">
        {!selectedRole && (
          <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 opacity-50 cursor-not-allowed">
            <HoverCard>
              <HoverCardTrigger>Apply with Profile</HoverCardTrigger>
              <HoverCardContent>Select a role to apply</HoverCardContent>
            </HoverCard>
          </div>
        )}
        {selectedRole && (
          <AlertDialog>
            <AlertDialogTrigger className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Apply with Profile
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">
                  Are you sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-400">
                  This action cannot be removed from history. Your profile
                  details will be used to apply for this project.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-white">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    handleApplication(
                      project.project_id,
                      project.project_title,
                      selectedRole
                    )
                  }
                >
                  Apply
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <div className="flex items-center cursor-pointer text-white">
          <span className="mr-2">View more</span>
          <img src={ViewMoreIcon} alt="View More" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
