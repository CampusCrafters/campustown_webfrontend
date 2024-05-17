import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProfile,
  uploadProfilePicture,
  deleteProfilePicture,
} from "../redux/profileActions";
import { useEffect, useState } from "react";
import default_pfp from "../assets/images/default-pfp.jpg";

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
      <div className="flex justify-center items-center h-screen">
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
    <div className="container mx-auto py-8">
      <div className="bg-white p-8 mb-8 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <img
            src={profile?.profile_picture || default_pfp}
            alt="Profile Picture"
            className="h-24 w-24 rounded-full mr-6 border-4 border-white shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-semibold">
              {profile?.name || "Name"}
            </h1>
            <p className="text-gray-600">{profile?.email || "Email"}</p>
            <div className="flex gap-2">
              <div className="inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-4 text-sm font-semibold shadow-md">
                {profile?.batch || "Batch"}
              </div>
              <div className="inline-block rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-4 text-sm font-semibold shadow-md">
                {profile?.branch || "Branch"}
              </div>
            </div>
          </div>
        </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(filteredProfile || {}).map(([key, value]) => (
            <div
              key={key}
              className="border border-gray-200 p-4 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold mb-2">{key}</h3>
              {Array.isArray(value) ? (
                <ul>
                  {value.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">{value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProfileComponent;
