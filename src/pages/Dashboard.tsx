import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getTokenAndStoreData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/oauth",
          {
            withCredentials: true, // Important: Set withCredentials to true to send cookies with the request
          }
        );
        console.log(response); // Log the response to see if the cookie is received
      } catch (error) {
        console.error("Error getting token:", error);
      }
    };

    // Call the function to get the token and store data
    getTokenAndStoreData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div> // Display a loading indicator while verifying token
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="text-6xl text-center">Welcome to the Dashboard</div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
