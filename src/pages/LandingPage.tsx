import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between">
      <div className="container mx-auto flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-gradient">Welcome to CampusTown</h1>
          <p className="text-lg md:text-2xl mb-4 md:mb-8">Where Collaboration Thrives</p>
          <p className="text-base md:text-lg mb-8">Join us to connect, collaborate, and create!</p>
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg"
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        </div>
      </div>
      <footer className="text-center text-gray-500 text-sm py-4">
        <p>&copy; 2024 CampusTown. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
