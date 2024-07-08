import {
  applyProject,
  getProjectWithId,
} from "@/redux/projects/projectsActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Badge, Button, Flex } from "@radix-ui/themes";
import { RootState } from "../../../redux/store";
import clockimg from "../../../assets/icons/clock-icon.svg";
import BackIcon from "../../../assets/icons/backicon.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { fetchUserProfile } from "@/redux/users/profileActions";
import { useToast } from "@/components/ui/use-toast";
import { Theme } from "@radix-ui/themes";
import TimeAgoPill from "@/components/custom-ui/TimeAgoPill";

const MoreDetails = () => {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const project_id = Number(params.get("id"));
  const project = useSelector(
    (state: RootState) => state.projects.projectDetails
  );

  const userProfile = useSelector(
    (state: RootState) => state.profile.userProfile
  );

  const [selectedRole, setSelectedRole] = useState();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        dispatch(getProjectWithId(project_id) as any);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    if (project_id) fetchProject();
  }, [dispatch, project_id]);

  const getUserProfile = async (user_id: number) => {
    try {
      await dispatch(fetchUserProfile(user_id) as any);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

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

  const startDate = project ? new Date(project.start_date) : null;
  const endDate = project ? new Date(project.end_date) : null;

  const getEstDuration = (startDate: any, endDate: any) => {
    if (!startDate || !endDate) return null;

    const start: any = new Date(startDate);
    const end: any = new Date(endDate);

    const totalMonths =
      (end.getFullYear() - start.getFullYear()) * 12 +
      end.getMonth() -
      start.getMonth();

    const startDay = start.getDate();
    const endDay = end.getDate();

    const daysInStartMonth = new Date(
      start.getFullYear(),
      start.getMonth() + 1,
      0
    ).getDate();
    const dayDifference =
      endDay >= startDay
        ? endDay - startDay
        : endDay - startDay + daysInStartMonth;
    const monthAdjustment = endDay >= startDay ? 0 : -1;

    const months = totalMonths + monthAdjustment;

    if (months === 0 && startDay !== endDay) {
      const totalDaysDifference = Math.ceil(
        (end - start) / (1000 * 60 * 60 * 24)
      );
      return { days: totalDaysDifference };
    }

    return { months, days: dayDifference };
  };

  const estMonth = getEstDuration(startDate, endDate);

  return (
    <>
      <div className="flex gap-4 ml-[15px] mt-[15px]">
        <img
          src={BackIcon}
          className="cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* <div style={headingStyles}>{activeTab}</div> */}
      </div>
      <Theme className=" !bg-transparent">
        <div className="flex justify-center flex-col items-center">
          {project ? (
            <>
              <div className="w-11/12 bg-neutral-900 rounded-[15px] mt-[15px]">
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
                <div className="flex gap-2 items-end ml-[16px]">
                  <Sheet>
                    <SheetTrigger>
                      <Avatar className="cursor-pointer rounded-[10px] h-[40px] w-[40px]">
                        {project.host_profile_picture ? (
                          <AvatarImage
                            src={project.host_profile_picture}
                            className=" "
                            onClick={() => getUserProfile(project.host_id)}
                          />
                        ) : (
                          <AvatarFallback
                            onClick={() => getUserProfile(project.host_id)}
                          >
                            {project.host_name.charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </SheetTrigger>
                    <SheetContent
                      side={"bottom"}
                      className="w-full h-[80vh] bg-gray-900"
                    >
                      <SheetHeader>
                        <SheetTitle>
                          <div className="flex items-center mb-6">
                            <img
                              src={
                                userProfile?.profile_picture ||
                                project.host_name.charAt(0)
                              }
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
                            {Object.entries(filteredProfile || {}).map(
                              ([key, value]) => (
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
                                        <li
                                          key={index}
                                          className="text-gray-400"
                                        >
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p className="text-gray-400">{value}</p>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>

                  <p className="text-gray-400 mb-2">{project.host_name}</p>
                </div>
                <div className="ml-[20px] mr-[18px]">
                  <div className="mt-4">
                    <div className="flex gap-4 justify-between items-center">
                      <span className="text-2xl font-bold text-white mb-2 break-words">
                        {project.project_title}
                      </span>

                      <Badge
                        radius="full"
                        size="3"
                        className="h-[18px]  !bg-white !text-black"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-white mb-2 text-[15px]">
                      {project.description}
                    </p>
                  </div>
                  <Flex
                    direction="row"
                    gap="3"
                    className="mt-[14px] mb-[20px] overflow-x-auto"
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

                  <div className="mt-[25px]">
                    <Flex gap="2" align="center">
                      <strong className="text-white text-[15px]">Roles:</strong>
                      <div className=" flex flex-wrap gap-[10px]">
                        {project.required_roles.map((role: any) => (
                          <Badge
                            variant={
                              selectedRole === role ? "solid" : "outline"
                            }
                            size="3"
                            radius="full"
                            key={role}
                            className={`text-center !min-h-[30px] !w-auto !border-solid !border-blue-600 !border ${
                              selectedRole ? "!text-white" : "!text-blue-600"
                            }`}
                            onClick={() =>
                              setSelectedRole((prevrole) =>
                                prevrole === role ? null : role
                              )
                            }
                          >
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </Flex>
                  </div>

                  <div className="flex justify-between mt-[25px]">
                    <p className="text-white text-[14px]">
                      Start Date:
                      <span className="font-bold">
                        {startDate?.toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-white text-[14px]">
                      Est Duration:
                      <span className="font-bold">
                        {estMonth
                          ? estMonth.months === undefined
                            ? estMonth.days + " days"
                            : estMonth.months + " months"
                          : 0}
                      </span>
                    </p>
                  </div>

                  <div className="mt-[15px] text-[15px]">
                    <span className="text-white font-semibold">
                      Relevant Links:{" "}
                    </span>
                    <a
                      href={project.link ? project.link : ""}
                      target="_blank"
                      className={`${
                        project.link ? "text-blue-600" : "text-white"
                      }`}
                    >
                      {project.link ? project.link : "No links provided"}
                    </a>
                  </div>

                  {selectedRole ? (
                    <div className="text-white mt-[20px] mb-[20px]">
                      <span className="mr-[8px]">
                        Skills required for the role:{" "}
                      </span>
                      <Badge
                        variant="solid"
                        size="3"
                        radius="full"
                        className={`text-center !min-h-[30px] !w-auto !border-solid !border-blue-600 !border !text-white`}
                      >
                        {selectedRole}
                      </Badge>
                      <ol className="ml-[25px] mt-[10px]">
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JS</li>
                      </ol>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-[14px] mt-[35px] mr-[20px] ml-[20px] mb-[20px] text-center">
                      <span className="font-medium">
                        Select a role to view the skills required and Apply
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 fixed bottom-0 w-11/12 ml-[25px] mr-[25px] mb-[25px] justify-center">
                <Button
                  className={`!h-[58px] !rounded-2xl  !bg-[#94C078] !text-base !font-semibold ${
                    selectedRole ? "!w-1/4" : "!w-3/4"
                  }`}
                >
                  Discuss
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger
                    className={`!h-[58px] !rounded-2xl !w-1/4  !text-base !font-semibold ${
                      selectedRole
                        ? "!w-3/4 !bg-[#0071D9] !text-white"
                        : "!w-1/4 !bg-gray-200 !text-zinc-400"
                    }`}
                    disabled={selectedRole === null}
                  >
                    Apply
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
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </Theme>
    </>
  );
};
export default MoreDetails;
