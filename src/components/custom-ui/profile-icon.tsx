import React from "react";
import defaultProfilePicture from "../../assets/icons/Default_pfp.svg.png";

const ProfileIcon = ({ src, size }: { src: string | null, size: string }) => {
  const profileIconContainer: React.CSSProperties = {
    height: size === "large" ? "55px" : "31px",
    width: size === "large" ? "55px" : "31px",
    borderRadius: "50%",
    overflow: "hidden", 
    border: size === "large" ? "2px solid #FFFFFF" : "1px solid #FFFFFF",
  };

  const profileIconImage: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover", 
  };

  const profileImageSrc = src ? src : defaultProfilePicture;

  return (
    <div style={profileIconContainer}>
      <img src={profileImageSrc} alt="Profile" style={profileIconImage} />
    </div>
  );
};

export default ProfileIcon;
