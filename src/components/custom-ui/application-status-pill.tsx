import React from "react";

interface ApplicationStatusProps {
  status: string; // Define the possible status values
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ status }) => {
  // Define a function to get the styles based on the status
  const getStatusStyles = (status: string): React.CSSProperties => {
    let backgroundColor = "#A3E635"; // Default color (lime)

    switch (status) {
      case "Accepted":
        backgroundColor = "rgba(156, 228, 83, 1)";
        break;
      case "Pending":
        backgroundColor = "rgba(210, 131, 45, 1)";
        break;
      case "Rejected":
        backgroundColor = "rgba(211, 70, 95, 1)";
        break;
      default:
        break;
    }

    return {
      padding: "8px 24px",
      fontSize: "12px",
      backgroundColor,
      color: "black",
      textAlign: "center",
      marginBottom: "14px",
      borderRadius: "0px 14px 0px 16px",
      alignSelf: "flex-end",
    };
  };

  return <span style={getStatusStyles(status)}>{status}</span>;
};

export default ApplicationStatus;
