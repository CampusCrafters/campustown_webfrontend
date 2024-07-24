import { useState } from "react";
import { useDispatch } from "react-redux";
import DefaultPfp from "../assets/icons/Default_pfp.png";
import Heart from "../assets/icons/bottom-bar/heart-active.svg";
import HeartRed from "../assets/icons/bottom-bar/heart-red.svg";
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
import { likeUser } from "@/redux/users/usersActions";

const ContactCard = ({ user, onClick }: any) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);

  const handleLike = async (user_id: number) => {
    try {
      const message = await dispatch<any>(likeUser(user_id));
      alert(message);
      setLike(true);
    } catch (error: any) {
      console.error("Error liking user:", error.message);
      alert(error.message); 
      setLike(false);
    }
  };  
  return (
    <div
      onClick={onClick}
      className="text-white cursor-pointer contact-card flex items-center p-3 border-b transition duration-300 ease-in-out hover:bg-gray-800"
    >
      <img
        className="rounded-full h-10 w-10 bg-gray-300 flex items-center justify-center mr-3"
        src={user.profile_picture ? user.profile_picture : DefaultPfp}
        alt={`${user.name}'s profile`}
      />
      <div className="flex justify-between w-[80vw] md:w-[93vw]">
        <div>{user.name}</div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div>
              {like ? <img src={HeartRed} alt="Liked" /> : <img src={Heart} alt="Like" />}
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleLike(user.user_id)}>
                Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ContactCard;
