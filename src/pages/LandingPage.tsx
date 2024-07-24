import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login");
  };

  return (
    <div style={containerStyles} className="ml-[30px] md:ml-[60px] lg:ml-[60px] mh-[100vh]">
      <div className=" bg-black text-white flex flex-col">
        <div className="text-[19px] md:text-[24px] lg:text-[24px]" style={logoStyles}>campusTown</div>
        <div className="text-[32px] w-[239px] md:text-[46px] md:w-[352px] lg:text-[46px] lg:w-[352px]" style={headingStyles}>
          its time, ready to start building together?
        </div>
        <button className="w-[127px] h-[54px] text-[16px] md:w-[228px] md:h-[70px] md:text-[28px] lg:w-[228px] lg:h-[70px] lg:text-[28px]" onClick={handleSignInClick} style={buttonStyles}>
          get started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

const logoStyles: React.CSSProperties = {
  color: "#FFF",
  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: 600,
};

const headingStyles: React.CSSProperties = {
  marginTop: '200px',
  height: "276px",
  color: "#FFF",
  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: 800,
  lineHeight: "52px",
  letterSpacing: "-0.3px",
};

const buttonStyles: React.CSSProperties = {
  display: "flex",
  marginTop: '80px',
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "999px",
  border: "1px solid var(--primaryBtnOut-stroke, #1849D6)",
  background: "var(--primaryBtnOut-default, #FFF)",
  color: "#1849D6",
  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: 600,
};

const containerStyles: React.CSSProperties = { 
  maxHeight: "100vh",
  maxWidth: "100vw",
  marginTop: '33px',
}
