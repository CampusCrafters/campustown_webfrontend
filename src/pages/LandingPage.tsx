import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6 text-gradient">Welcome to Campus Connect</h1>
          <p className="text-2xl mb-8">Where Collaboration Thrives</p>
          <p className="text-lg mb-12">Join us to connect, collaborate, and create!</p>
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-bold py-4 px-8 rounded-full text-lg"
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        </div>
      </div>
      <footer className="text-center text-gray-500 text-sm py-4">
        <p>&copy; 2024 Campus Connect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
