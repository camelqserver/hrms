import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import TodayIcon from '@mui/icons-material/Today';
import CampaignIcon from '@mui/icons-material/Campaign';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const HRSidebar = () => {
  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Employees', icon: <GroupIcon />, path: '/EmployeePage' },
    { text: 'Leaves', icon: <TimeToLeaveIcon />, path: '/leave' },
    { text: 'Attendances', icon: <TimeToLeaveIcon />, path: '/hr/attendance' },
    { text: 'Announcements', icon: <CampaignIcon />, path: '/add-announcement' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/AdminSettings' },
    { text: 'Salary Structure page', icon: <SettingsIcon />, path: '/SalaryStructurePage' },
    { text: 'Payslip Page', icon: <SettingsIcon />, path: '/PayslipPage' },
    { text: 'Feedback Page', icon: <SettingsIcon />, path: '/submit-feedback' },
    { text: 'Holiday', icon: <SettingsIcon />, path: '/holidays' },

  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth, 
        flexShrink: 1,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1e1e2f',
          color: '#fff',
          marginTop: '4%'
        },
      }}
    >
      <Toolbar />
      <Box sx={{mt: -9}}>
        <List>
          {navItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path}>
              <ListItemIcon sx={{ color: '#fff' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText sx={{color:'#fff'}}primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default HRSidebar;
