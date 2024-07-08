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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import default_pfp from "../assets/icons/Default_pfp.svg.png";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { applyProject } from "../redux/projects/projectsActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchUserProfile } from "@/redux/users/profileActions";
import { Button, Tooltip, Badge, Flex } from "@radix-ui/themes";
import clockimg from "../assets/icons/clock-icon.svg";
import { useNavigate } from "react-router-dom";
import TimeAgoPill from "./custom-ui/TimeAgoPill";

const ProjectCard = ({ project }: any) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const userProfile = useSelector(
    (state: RootState) => state.profile.userProfile
  );

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
    <div className=" flex flex-col rounded-2xl shadow-lg bg-neutral-900 border border-gray-700 mb-[10px]">
      <Flex className="mb-[15px]" align="center">
        <Badge
          radius="full"
          variant="solid"
          size="3"
          className="w-[71px] max-h-[18px] mt-[5px] ml-[11px] justify-center"
        >
          <span className=" text-[10px]">Project</span>
        </Badge>
        <span className="text-slate-500 text-[10.14px] font-normal font-['Poppins'] leading-snug ml-[10px] mt-[5px]">
          Edited
        </span>
        <div className="w-[98px] h-[27.75px] relative ml-auto">
          <div
            className="w-[98px] h-[27.75px] left-0 top-0 absolute rounded-tr-[15px] rounded-bl-lg"
            style={{ backgroundColor: "#1DB954" }}
          ></div>
          <div className="w-5 h-[20.56px] left-[8px] top-[3.03px] absolute">
            <img src={clockimg}></img>
          </div>
          <div className="w-[67px] h-[19.53px] left-[29px] top-[3.03px] absolute text-center text-black text-[10px] font-medium font-['Roboto Flex'] leading-snug flex items-center justify-center">
            <TimeAgoPill startTime={project.posted_on} />
          </div>
        </div>
      </Flex>
      <div className="flex gap-2 items-end">
        <Sheet>
          <SheetTrigger>
            <Avatar className="cursor-pointer ml-[16px] rounded-[10px] h-[40px] w-[40px]">
              {project.profile_picture ? (
                <AvatarImage
                  src={project.profile_picture}
                  className=" "
                  onClick={() => getUserProfile(project.host_id)}
                />
              ) : (
                <AvatarFallback onClick={() => getUserProfile(project.host_id)}>
                  {project.name.charAt(0)}
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

        <p className="text-gray-400 mb-2">{project.name}</p>
      </div>
      <div className="ml-[16px]">
        <div className="mt-4 ">
          <div className="flex gap-4 justify-between items-center">
            <span
              className="text-2xl font-bold text-white mb-2 break-word"
              style={{ fontFamily: "Raleway" }}
            >
              {project.project_title}
            </span>

            <Badge
              radius="full"
              size="3"
              className="h-[18px] mr-[18px] !bg-white !text-black"
            >
              {project.status}
            </Badge>
          </div>
          <p
            className="text-white mb-2 ml-[10px] mr-[65px] text-[15px]"
            style={{ fontFamily: "Roboto Flex" }}
          >
            {project.description}
          </p>
        </div>
      </div>
      <div className="ml-[16px] mt-auto">
        <div className="mt-[8px] ml-[10px]">
          <strong className="text-white text-[15px] mr-[5px]">Roles:</strong>
          {project.required_roles.map((role: any) => (
            <Badge
              variant={selectedRole === role ? "solid" : "outline"}
              size="3"
              radius="full"
              key={role}
              className={`text-center !min-h-[30px] !w-auto !border-solid !border-blue-600 !border  ${
                selectedRole ? "!text-white" : "!text-blue-600"
              } mr-[5px] mb-[8px]`}
              onClick={() =>
                setSelectedRole((prevRole) => (prevRole === role ? null : role))
              }
            >
              {role}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between mt-[20px] mr-[18px]">
          <Button
            className="!h-[38px] !bg-transparent !text-white !border-solid !border !border-white"
            onClick={() => navigate(`/details?id=${project.project_id}`)}
          >
            <span className="">More Details</span>
          </Button>
          {!selectedRole && (
            <div>
              <Tooltip content="Select a role to apply">
                <Button
                  className="!h-[38px] !bg-transparent !text-white !border-solid !border !border-white"
                  disabled
                >
                  Join
                </Button>
              </Tooltip>
            </div>
          )}
          {selectedRole && (
            <AlertDialog>
              <AlertDialogTrigger>
                <Button className="!h-[38px] !bg-transparent !text-white !border-solid !border !border-white">
                  Join
                </Button>
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
        </div>
        <Flex
          direction="row"
          gap="3"
          className="mt-[14px]  mb-[20px] overflow-x-auto"
        >
          {project.domain.split(",")?.map((domain: any) => (
            <Badge
              radius="full"
              size="3"
              style={{ background: "#BEC5C8" }}
              className="h-[21px]"
              variant="solid"
            >
              <p className="text-black">{domain}</p>
            </Badge>
          ))}
        </Flex>
      </div>
    </div>
  );
};

export default ProjectCard;
