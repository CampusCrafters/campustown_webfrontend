import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    rollnumber: "A12345",
    batch: "2022",
    dob: "1990-01-01",
    location: "New York, USA",
    pers_email: "john.doe@example.com",
    mobile: "+1 234 567 890",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    github: "https://github.com/johndoe",
    linkedin: "https://www.linkedin.com/in/johndoe",
    skills: ["JavaScript", "React", "Node.js"],
    interests: ["Reading", "Traveling"],
    learning: ["GraphQL", "Docker"],
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleImageChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!image) {
      setMessage('Please select an image.');
      return;
    }
    const formData = new FormData();
    formData.append('image', image);

    try {
    const response = await axios.post(`${backendURL}/api/v1/user/addProfilePicture`, formData, {
      withCredentials: true,
    });

      if (response.status === 200) {
        const data = response.data;
        setMessage(data.message);
      } else {
        setMessage('Error uploading image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Error uploading image.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate("/dashboard")}
      >
        Back
      </button>
      <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center justify-center p-6 bg-gray-700">
          <img
            src="https://dummyimage.com/200x200/000/fff"
            alt="Profile"
            className="h-24 w-24 rounded-full"
          />
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="file" onChange={handleImageChange} accept="image/*" />
            <button type="submit">Upload</button>
          </form>
          <div>{message}</div>
        </div>
        <div className="px-6 py-4">
          <div className="flex justify-center mb-2">
            <div className="font-bold text-xl mr-2">{userData.name}</div>
            <div className="flex">
              <a
                href={userData.github}
                className="mr-2 text-blue-500 hover:text-blue-700"
              >
                GitHub
              </a>
              <a
                href={userData.linkedin}
                className="text-blue-500 hover:text-blue-700"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="text-gray-700 text-base mb-4 text-center">
            {userData.email}
          </div>
          <div className="mb-4">
            <div className="font-bold">Location:</div>
            <div>{userData.location}</div>
          </div>
          <div className="mb-4">
            <div className="font-bold">About:</div>
            <p className="text-gray-700 text-base">{userData.about}</p>
          </div>
          <div className="mb-4">
            <div className="font-bold">Skills:</div>
            <ul>
              {userData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <div className="font-bold">Interests:</div>
            <ul>
              {userData.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <div className="font-bold">Learning:</div>
            <ul>
              {userData.learning.map((learning, index) => (
                <li key={index}>{learning}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
