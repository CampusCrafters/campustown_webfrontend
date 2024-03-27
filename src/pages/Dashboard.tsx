import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getTokenAndStoreData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);

        // Get the value of the 'token' parameter from the URL
        const token = urlParams.get("token");

        // If token is available, make a request to verifyTokenService endpoint
        if (token) {
          const response = await axios.get(
            "http://localhost:5000/api/v1/user/verifyToken",
            {
              params: { token }, // Pass the token as a query parameter
              // withCredentials: true, // You can uncomment this if needed
            }
          );
          console.log(response.data); // Log the response data to see if the token is verified successfully
          if (response.data && response.data.success) {
            setIsLoading(false);
          }
        } else {
          console.error("Token not found in URL");
        }
      } catch (error) {
        console.error("Error getting token:", error);
      }
    };

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
