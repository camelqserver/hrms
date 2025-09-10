import React, { useState } from "react";
import HRNavbar from "../components/hr/HRNavbar";
import HRSidebar from "../components/hr/HRSidebar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Box, Typography, Paper } from "@mui/material";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const backgroundStyle = {
    backgroundImage:
      'url("https://www.shutterstock.com/image-photo/human-resources-crm-recruitment-business-260nw-682280383.jpg")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    width: "100%",
    paddingTop: "64px",
    position: "fixed"
  };

  const infoLines = [
    "Welcome to the HR Portal.",
    "Manage employee data efficiently.",
    "Track attendance and leaves.",
    "Generate payslips and reports.",
    "Control access and permissions.",
    "Streamline onboarding process."
  ];

  return (
    <>
    <HRNavbar/>
      {/* Menu Icon */}
      <IconButton
        onClick={toggleSidebar}
        aria-label="menu"
        sx={{
          position: "fixed",
          top: "16px",
          left: "16px",
          zIndex: 1300,
          color: "#fff",
          marginTop:'4%'
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar */}
      {sidebarOpen && <HRSidebar />}

      {/* Background */}
      <div style={backgroundStyle}>

        <Box
          sx={{
            position: "absolute",
            top: "20%",
            right: "5%",
            width: "350px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            borderRadius: "12px",
            padding: 4,
            color: "#fff",
            boxShadow: 3
          }}
        >
          <Typography variant="h5" gutterBottom>
            HR Portal Features
          </Typography>
          {infoLines.map((line, index) => (
            <Typography key={index} variant="body1" sx={{ mb: 1.5 }}>
              • {line}
            </Typography>
          ))}
        </Box>
      </div>
    </>
  );
}
