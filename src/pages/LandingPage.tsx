import googlebtn from "../assets/With Text.svg";
import axios from "axios";

const LandingPage = () => {
  const auth = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/v1/user/gsignin"
      );
      const { url } = response.data;
      window.location.href = url; // Redirect to the Google authentication page
    } catch (error) {
      console.log("Error initiating Google Sign-In:", error);
    }
  };

  return (
    <div>
      <h1>LandingPage</h1>
      <button onClick={() => auth()}>
        <img src={googlebtn} alt="google signin button" />
      </button>
    </div>
  );
};

export default LandingPage;
