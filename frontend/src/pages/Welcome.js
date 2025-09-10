import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            backgroundImage: `linear-gradient(
              rgba(0,0,0,0.5), 
              rgba(0,0,0,0.5)
            ), url(https://www.shutterstock.com/image-photo/indian-cameleers-camel-driver-bedouin-600nw-1724207551.jpg)`,
            backgroundSize: "cover",       // Ensures full coverage
            backgroundRepeat: "no-repeat", // Prevents tiling
            backgroundAttachment: "fixed", // Keeps it steady on scroll
            backgroundPosition: "center",  // Centers the image
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
            
          }}
        >

      {/* 👇 Company Logo */}
      <img
        src="https://media.licdn.com/dms/image/v2/D4D0BAQHFvi8wAnpFdQ/company-logo_200_200/company-logo_200_200/0/1731679621888?e=2147483647&v=beta&t=zBQONtVJ9xFQXZIJ8ICIImAw5yvyay3VfAPpq2cE1CQ"
        alt="Company Logo"
        style={{
          width: '150px',
          height: 'auto',
          marginBottom: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}
      />

      <Typography
        variant="h2"
        gutterBottom
        sx={{ fontWeight: 'bold', textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
      >
        Welcome to CamelQ Software Solutions
      </Typography>

      <Typography
        variant="h6"
        sx={{ mb: 4, textShadow: '1px 1px 6px rgba(0,0,0,0.7)' }}
      >
        Explore the universe of possibilities with us!
      </Typography>

      <Link to="/HR/Login" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" sx={{ px: 4, py: 1.5 }}>
          HR Login
        </Button>
      </Link>

      <br />

      <Link to="/employee/login" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" sx={{ px: 4, py: 1.5 }}>
          Employee Login
        </Button>
      </Link>
    </Box>
  );
}
