import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto min-h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-6">Landing Page</h1>
        </div>
      </div>
      <div className="text-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={handleSignInClick}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
