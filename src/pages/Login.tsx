import { useEffect } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import GoogleButton from "../assets/icons/google-button.svg";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const LoginPage = () => {
  const { toast } = useToast();

  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get("error");
    if (error) {
      console.log("Unauthorized email domain");
      toast({
        variant: "destructive",
        title: "Unauthorized email domain",
        description: "Please use your college email ID to sign in.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }, []);

  const handleSignIn = async () => {
    try {
      console.log(backendURL);
      const response = await axios.post(`${backendURL}/api/v1/user/gsignin`);
      const { url } = response.data;
      window.location.href = url; // Redirect to the Google authentication page
    } catch (error) {
      console.log("Error initiating Google Sign-In:", error);
    }
  };

  return (
    <>
      <div
        style={containerStyles}
        className="ml-[30px] md:ml-[60px] lg:ml-[60px] mh-[100vh]"
      >
        <div className=" bg-black text-white flex flex-col">
          <div
            className="text-[19px] md:text-[24px] lg:text-[24px]"
            style={logoStyles}
          >
            campusTown
          </div>
          <div
            className="text-[32px] w-[235px] md:text-[46px] md:w-[352px] lg:text-[46px] lg:w-[352px]"
            style={headingStyles}
          >
            projects, ideas, startups, internships, hackathons, etc...
          </div>
          <img
            src={GoogleButton}
            alt="Google Sign-In"
            className="cursor-pointer"
            style={buttonStyles}
            onClick={handleSignIn}
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;

const logoStyles: React.CSSProperties = {
  color: "#FFF",
  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: 600,
};

const headingStyles: React.CSSProperties = {
  marginTop: "200px",
  height: "276px",
  color: "#FFF",
  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: 800,
  lineHeight: "52px",
  letterSpacing: "-0.3px",
};

const buttonStyles: React.CSSProperties = {
  width: '250px',
  height: '70px',
  display: "flex",
  marginTop: "80px",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  borderRadius: "999px",
};

const containerStyles: React.CSSProperties = {
  maxHeight: "100vh",
  maxWidth: "100vw",
  marginTop: "33px",
};
