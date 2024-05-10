import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const useRedirectToDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/api/v1/user/verifyToken`,
          {
            withCredentials: true,
          }
        );

        if (response.data.decoded) {
            navigate("/dashboard");
        } else {
          console.log("Token verification unsuccessful");
          setIsLoading(false); 
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsLoading(false);
        navigate("/login");
      }
    };

    verifyToken();
  }, []);

  return isLoading; 
};

export default useRedirectToDashboard;
