import React from "react";
import ApplicationStatus from "@/components/custom-ui/application-status-pill";

interface ApplicationCardProps {
  date: string;
  name: string;
  projectName: string;
  status: string;
  role: string;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  date,
  name,
  projectName,
  status,
  role,
}) => {
  return (
    <article style={articleStyles}>
      <div style={leftContainerStyles}>
        <time style={dateStyles}>Applied on {date}</time>
        <p style={nameStyles}>{name}'s</p>
        <h2 style={projectNameStyles}>{projectName}</h2>
        <a href="#" style={viewProjectButtonStyles}>
          View Project
        </a>
      </div>
      <div style={rightContainerStyles}>
        <ApplicationStatus status={status} />
        <p style={roleStyles}>{role}</p>
        <a href="#" style={editButtonStyles}>
          Edit Application
        </a>
      </div>
    </article>
  );
};

export default ApplicationCard;

const articleStyles: React.CSSProperties = {
  display: "flex",
  gap: "20px",
  justifyContent: "space-between",
  color: "white",
  maxWidth: "100%",
  backgroundColor: "#151515",
  paddingLeft: "12px",
  paddingBottom: "12px",
  borderRadius: "14px",
  marginTop: "20px",
};

const leftContainerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const dateStyles: React.CSSProperties = {
  color: "#64748B",
  fontSize: "12px",
  lineHeight: "2.19",
  marginBottom: "14px",
  marginTop: "10px",
};

const nameStyles: React.CSSProperties = {
  color: "#D6D3D1",
  fontSize: "12px",
};

const projectNameStyles: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
};

const viewProjectButtonStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  padding: "8px 14px",
  fontSize: "12px",
  fontWeight: "medium",
  textTransform: "lowercase",
  borderRadius: "8px",
  border: "1px solid white",
  textDecoration: "none",
  color: "white",
  marginTop: "10px",
};

const rightContainerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",

  alignItems: "center",
};

const roleStyles: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "600",
  textAlign: "center",
  marginBottom: "10px",
  marginRight: "20px",
  marginTop: "20px",
};

const editButtonStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  padding: "8px 14px",
  fontSize: "12px",
  fontWeight: "medium",
  textTransform: "lowercase",
  borderRadius: "8px",
  border: "1px solid white",
  color: "white",
  marginTop: "10px",
  marginRight: "20px",
};
