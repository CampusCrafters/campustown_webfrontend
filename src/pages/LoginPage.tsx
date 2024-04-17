import { useEffect } from "react";
import googlebtn from "../assets/With Text.svg";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const LoginPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      const code = encodeURI(
        new URLSearchParams(window.location.search).get("code") as string
      );
      console.log(code);
      if (code) {
        const response = await axios.post(
          `${backendURL}/api/v1/user/oauth?code=${code}`
        );
        console.log(response);
      }
    };
    fetchData();
  }, []);

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        `${backendURL}/api/v1/user/gsignin`
      );
      const { url } = response.data;
      window.location.href = url; // Redirect to the Google authentication page
    } catch (error) {
      console.log("Error initiating Google Sign-In:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-6">Welcome to Your App</h1>
        <p className="mb-8">Please sign in with your Google account</p>
        <button
          onClick={() => handleSignIn()}
          className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          <img src={googlebtn} alt="Google signin button" className="mr-2" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
