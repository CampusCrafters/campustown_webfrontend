import { useEffect, useState } from "react";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const useTokenVerification = () => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    verifyToken();
  }, []);

  return { user, loading }; // Return both user and loading state
};

export default useTokenVerification;
