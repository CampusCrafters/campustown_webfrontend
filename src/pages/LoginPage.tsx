import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import googlebtn from "../assets/With Text.svg";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get("error");
    if (error) {
      console.log("Unauthorized email domain");
      setError("Unauthorized email domain");
    }
  }, []);

  useEffect(() => {
    const delay = 2000; // 2 second delay
  
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/api/v1/user/verifyToken`,
          {
            withCredentials: true, // Include cookies in the request
          }
        );
    
        if (response.data && response.data.success) {
          // Token verification successful
        } else {
          console.log("Token verification unsuccessful");
          navigate("/dashboard"); // Redirect to dashboard if verification fails.
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        // navigate("/login");
      }
    };
      
    // Initial call to verifyToken
    verifyToken();
  
    // Set interval to call verifyToken repeatedly
    const intervalId = setInterval(verifyToken, delay);
  
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${backendURL}/api/v1/user/gsignin`);
      const { url } = response.data;
      window.location.href = url; // Redirect to the Google authentication page
    } catch (error) {
      console.log("Error initiating Google Sign-In:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between">
      <div className="flex-grow flex items-center justify-center">
      <div className="text-center flex flex-col justify-center items-center h-screen">
  <h1 className="text-6xl font-bold mb-6">{error === "" ? "Welcome to Campus Connect" : "Unauthorized Email"}</h1>
  <p className="text-xl mb-8">{error === "" ? "Please sign in with your College Email ID" : "Please use your college Email Id"}</p>
  <button
    onClick={() => handleSignIn()}
    className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-black font-bold py-3 px-6 rounded-full text-lg"
  >
    <img src={googlebtn} alt="Google signin button" className="mr-2" />
    Sign in with Google
  </button>
</div>

      </div>
      <footer className="text-center text-gray-500 text-sm py-4">
        <p>&copy; 2024 Campus Connect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
