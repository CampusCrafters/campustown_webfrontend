import React from "react";

const ProfileIcon = ({ src, size }: { src: string, size: string }) => {
    const profileIconContainer: React.CSSProperties = {
        height: size === "large" ? "55px" : "31px",
        width: size === "large" ? "55px" : "31px",
        borderRadius: "50%",
        overflow: "hidden", 
        border: size === "large" ? "2px solid #FFFFFF" : "1px solid #FFFFFF",
      };
      
  return (
    <div style={profileIconContainer}>
      <img src={src} alt="Profile" style={profileIconImage} />
    </div>
  );
};

export default ProfileIcon;

const profileIconImage: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover", 
};
