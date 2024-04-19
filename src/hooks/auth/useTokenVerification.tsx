import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useTokenVerification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/verifyToken",
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