import { useEffect, useState } from "react";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const useTokenVerification = () => {
  const [user, setUser] = useState(false);

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
          setUser(true);
        } else {
          console.log("Token verification unsuccessful");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    };

    verifyToken();
  }, []);

  return user; 
};

export default useTokenVerification;
