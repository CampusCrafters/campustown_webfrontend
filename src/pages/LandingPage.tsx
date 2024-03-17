import googlebtn from "../assets/With Text.svg";
import axios from "axios";

const LandingPage = () => {
  const auth = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/v1/user/gsignin",
        {},
        { withCredentials: true }
      );
      const { url } = response.data;
      window.location.href = url; // Redirect to the Google authentication page
    } catch (error) {
      console.log("Error initiating Google Sign-In:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-white font-bold text-xl">
              IIIT Kottayam Campus Connect
            </div>
            {/* You can add additional navbar items here if needed */}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto min-h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-6">
            Welcome to IIIT Kottayam Campus Connect
          </h1>
          <p className="text-lg mb-8">
            "Bringing Minds Together, Forging Futures Forever"
          </p>
          <button onClick={() => auth()}>
            <img src={googlebtn} alt="google signin button" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
