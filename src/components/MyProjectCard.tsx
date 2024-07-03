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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProject } from "../redux/projects/projectsActions";
import { Button, Tooltip, Badge, Flex, Avatar } from "@radix-ui/themes";
import clockimg from "../assets/icons/clock-icon.svg";

const MyProjectsCard = ({ project }: any) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate(); // Get the navigate function
  const formattedStartDate = new Date(project.start_date).toLocaleDateString();
  const formattedEndDate = new Date(project.end_date).toLocaleDateString();

  const handleManageProject = async () => {
    navigate("/manageproject/editProject?project_id=" + project.project_id);
  };

  const handleDelete = async (project_id: number) => {
    try {
      await dispatch(deleteProject(project_id) as any);
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

  return (
    <div className="rounded-2xl shadow-lg bg-neutral-900 border border-gray-700 mb-[10px]">
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
          <div className="w-[98px] h-[27.75px] left-0 top-0 absolute bg-lime-400 rounded-tr-[15px] rounded-bl-lg"></div>
          <div className="w-5 h-[20.56px] left-[8px] top-[3.03px] absolute">
            <img src={clockimg}></img>
          </div>
          <div className="w-[60px] h-[19.53px] left-[29px] top-[3.03px] absolute text-center text-black text-[10px] font-medium font-['Roboto Flex'] leading-snug flex items-center justify-center">
            1 Hour ago
          </div>
        </div>
      </Flex>
      <div className="flex gap-2 items-end">
        <Avatar
          className="cursor-pointer ml-[16px] rounded-[10px] h-[40px] w-[40px]"
          src={project.profile_picture}
          fallback="A"
        ></Avatar>

        <p className="text-gray-400 mb-2">{project.name}</p>
      </div>

      <div className="ml-[16px]">
        <div className="mt-4 ">
          <div className="flex gap-4 justify-between items-center">
            <span className="text-2xl font-bold text-white mb-2">
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
          <p className="text-white mb-2 ml-[10px] mr-[65px] text-[15px]">
            {project.description}
          </p>
        </div>

        {/* <p className="text-gray-400 mb-2">
          <strong>Start Date:</strong> {formattedStartDate}
        </p>
        <p className="text-gray-400 mb-2">
          <strong>End Date:</strong> {formattedEndDate}
        </p> */}

        <p className="mt-4 ml-[10px]">
          <strong className="text-white">Members: </strong>
          {project.members && project.members.length > 0 ? (
            project.members.map((member: any, index: number) => (
              <span key={member.user_id} className="mr-2 text-white">
                {userProfiles[member.user_id] || "Loading Members..."}

                {index !== project.members.length - 1 && ", "}
              </span>
            ))
          ) : (
            <span className="text-white">No members</span>
          )}
        </p>
        {/* <p className="mb-2">
        <strong>Start Date: </strong> {formattedStartDate}
      </p>
      <p className="mb-2">
        <strong>End Date: </strong> {formattedEndDate}
      </p> */}
        <div className="mt-[8px] ml-[10px]">
          <Flex gap="2" align="center">
            <strong className="text-white text-[15px]">Roles:</strong>
            {project.required_roles.map((role: any) => (
              <Badge
                variant="outline"
                size="3"
                radius="full"
                key={role}
                className="text-center !min-h-[30px] !w-auto !border-solid !border-blue-600 !border !text-blue-600"
              >
                {role}
              </Badge>
            ))}
          </Flex>
        </div>
        {/* <p className="mb-2">
        <strong>Link: </strong>{" "}
        <a href={project.link} className="text-blue-600">
          {project.link}
        </a>
      </p> */}
        <div className="flex items-center justify-between mt-[20px] mr-[18px]">
          <Button
            className="!h-[38px] !bg-transparent !text-white !border-solid !border !border-white"
            onClick={handleManageProject}
          >
            Manage Project
          </Button>
          <AlertDialog>
            <AlertDialogTrigger className="">
              <Button className="!h-[38px] !bg-transparent !text-white !border-solid !border !border-white">
                Delete Project
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your project.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(project.project_id)}
                >
                  Delete Project
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <Flex direction="row" gap="3" className="mt-[14px]  mb-[20px]">
          <Badge
            radius="full"
            size="3"
            style={{ background: "#BEC5C8" }}
            className="h-[21px]"
            variant="solid"
          >
            <p className="text-black">{project.domain}</p>
          </Badge>
        </Flex>
      </div>
    </div>
  );
};

export default MyProjectsCard;
