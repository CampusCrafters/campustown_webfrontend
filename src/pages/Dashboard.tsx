import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/verifyToken",
          { withCredentials: true } // Set withCredentials to true
        );
        if (response.status === 200) {
          setIsLoading(false);
          const token = response.headers["authorization"];
          // Store or use the token as needed
          console.log("Token:", token);
        } else {
          navigate("/"); // Redirect to login page if token verification fails
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        navigate("/"); // Redirect to login page if an error occurs
      }
    };

    verifyToken();
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
