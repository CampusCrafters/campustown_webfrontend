import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const useTokenVerification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const delay = 1000; // 1 second delay

    const verifyToken = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, delay)); // Introduce a delay of 1 second

        const response = await axios.get(
          `${backendURL}/api/v1/user/verifyToken`,
          {
            withCredentials: true, // Include cookies in the request
          }
        );

        if (response.data && response.data.success) {
          setIsLoading(false);
        } else {
          console.log("Token verification unsuccessful");
          navigate("/login"); // Redirect to login page if token verify fails.
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        navigate("/login");
      }
    };

    verifyToken();
  }, []);

  return isLoading;
};

export default useTokenVerification;
