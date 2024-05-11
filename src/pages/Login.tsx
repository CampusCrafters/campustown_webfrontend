import { useEffect, useState } from "react";
import googlebtn from "../assets/images/GoogleButton.svg";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const LoginPage = () => {
  const [error, setError] = useState("");

  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get("error");
    if (error) {
      console.log("Unauthorized email domain");
      setError("Unauthorized email domain");
    }
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
    <>
      <div className="min-h-screen bg-black text-white flex flex-col justify-between">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center flex flex-col justify-center items-center h-screen max-w-screen-sm mx-auto px-4">
            <h1 className="text-6xl font-bold mb-6">
              {error === ""
                ? "Welcome to Campus Connect"
                : "Unauthorized Email"}
            </h1>
            <p className="text-xl mb-8">
              {error === ""
                ? "Please sign in with your College Email ID"
                : "Please use your college Email Id"}
            </p>
            <button
              onClick={() => handleSignIn()}
              className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-black font-bold py-2 px-4 rounded-full text-base md:text-lg" // Updated button styles
            >
              <img
                src={googlebtn}
                alt="Google signin button"
                className="mr-2"
              />
              Sign in with Google
            </button>
          </div>
        </div>
        <footer className="text-center text-gray-500 text-sm py-4">
          <p>&copy; 2024 Campus Connect. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default LoginPage;
