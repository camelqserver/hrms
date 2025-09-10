// src/components/employee/EmployeeNavbar.jsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

const navItems = [
  { text: 'Dashboard', to: '/employee/dashboard' },
  { text: 'Clockin/clockout', to: '/ClockInOutForm' },
  { text: 'Leave Request', to: '/Leaverequestpage' },
  { text: 'Payslip', to: '/Employeepayslip' },
  { text: 'Announcements', to: '/announcements' },
  { text: 'holidays', to: '/holidaydisplay' },
];

const EmployeeNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.to}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" component="nav">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <img 
                src="https://media.licdn.com/dms/image/v2/D4D0BAQHFvi8wAnpFdQ/company-logo_200_200/company-logo_200_200/0/1731679621888?e=2147483647&v=beta&t=zBQONtVJ9xFQXZIJ8ICIImAw5yvyay3VfAPpq2cE1CQ" // Replace this with the correct path to your image 
                style={{ height: 40 }} 
              />
          <Typography variant="h7" component="div">

            Camel Q Software Solution Pvt Ltd
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={RouterLink}
                to={item.to}
              >
                {item.text}
              </Button>
            ))}
          </Box>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ display: { sm: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default EmployeeNavbar;
