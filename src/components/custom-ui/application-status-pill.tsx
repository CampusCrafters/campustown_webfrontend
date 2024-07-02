import React from "react";

interface ApplicationStatusProps {
  status: string;
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ status }) => {
  return <span style={statusStyles}>{status}</span>;
};

export default ApplicationStatus;

const statusStyles: React.CSSProperties = {
  padding: "8px 24px",

  fontSize: "12px",
  backgroundColor: "#A3E635", // Lime 400 equivalent
  color: "black",
  textAlign: "center",
  marginBottom: "14px",
  borderRadius: "0px 14px 0px 16px",
};
