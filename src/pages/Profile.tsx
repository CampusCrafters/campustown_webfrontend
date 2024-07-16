import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProfile,
  uploadProfilePicture,
  deleteProfilePicture,
} from "../redux/users/profileActions";
import { useEffect, useState } from "react";
import default_pfp from "../assets/icons/Default_pfp.svg.png";
import EditIcon from "../assets/icons/EditIcon.svg";
import DeleteIcon from "../assets/icons/DeleteIcon.svg";
import CloseIcon from "../assets/icons/CloseIcon.svg";
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

const ProfileComponent = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile.profile);

  useEffect(() => {
    dispatch(fetchProfile() as any);
  }, [dispatch]);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const allowedFileTypes = ["image/jpeg", "image/png"];
      if (!allowedFileTypes.includes((file as File).type)) {
        alert("Invalid file type. Please upload a JPEG or PNG image.");
        return;
      }
      const formData = new FormData();
      formData.append("image", file);
      dispatch(uploadProfilePicture(file) as any);
    }
  };

  const handleDelete = () => {
    dispatch(deleteProfilePicture() as any);
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#151515]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const filteredProfile: { [key: string]: any } | null = profile
    ? { ...profile }
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
    <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 bg-[#151515] min-h-screen">
      <div className="bg-[#151515] p-4 sm:p-8 mb-4 sm:mb-8 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-6">
          <AlertDialog>
            <AlertDialogTrigger>
              <img
                src={profile?.profile_picture || default_pfp}
                alt="Profile Picture"
                className="h-32 w-32 sm:h-64 sm:w-64 rounded-full mb-4 sm:mb-0 mr-0 sm:mr-6 border-4 border-white shadow-lg"
              />
            </AlertDialogTrigger>
            <AlertDialogContent className="h-[72%] w-full bg-[#151515] border-none">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">
                  {profile.name}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <img
                    src={profile?.profile_picture || default_pfp}
                    alt="Profile Picture"
                    className="h-40 w-40 sm:h-70 sm:w-70 rounded-full mr-6 border-4 border-white shadow-lg"
                  />
                  <div className="flex items-center mb-6">
                    <input
                      type="file"
                      accept=".jpeg, .jpg, .png"
                      onChange={handleFileChange}
                      className="border border-gray-300 rounded py-1 px-2 mr-2"
                    />
                    <button
                      onClick={handleUpload}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-lg mr-2"
                    >
                      Upload
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex justify-between items-center">
                <AlertDialogCancel>
                  <img src={CloseIcon}></img>
                </AlertDialogCancel>
                <AlertDialogAction>
                  <img src={EditIcon}></img>
                </AlertDialogAction>
                <AlertDialogAction>
                  <img src={DeleteIcon}></img>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-3xl font-semibold text-white">
              {profile?.name || "Name"}
            </h1>
            <p className="text-gray-400">{profile?.email || "Email"}</p>
            <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-4">
              <div className="inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-4 text-sm font-semibold shadow-md">
                {profile?.batch || "Batch"}
              </div>
              <div className="inline-block rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-4 text-sm font-semibold shadow-md">
                {profile?.branch || "Branch"}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(filteredProfile || {}).map(([key, value]) => (
            <div
              key={key}
              className="border border-gray-200 p-4 rounded-lg shadow-md bg-[#1e1e1e]"
            >
              <h3 className="text-lg font-semibold mb-2 text-white">{key}</h3>
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
      </div>
    </div>
  );
};

export default ProfileComponent;
