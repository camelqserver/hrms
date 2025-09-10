import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EmployeeDashboard() {
  const [employeeData, setEmployeeData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('employeeToken');
    const employeeId = localStorage.getItem('employeeId');

    if (!token || !employeeId) {
      navigate('/employee/login');
      return;
    }

    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/${employeeId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEmployeeData(response.data);
      } catch (err) {
        console.error('Error fetching employee data:', err);
        setError(err.response?.data?.message || 'Failed to fetch employee data. Please try again.');
        if (err.response?.status === 401) {
          navigate('/employee/login');
        }
      }
    };

    fetchEmployeeData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('employeeToken');
    localStorage.removeItem('employeeId');
    navigate('/employee/login');
  };

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!employeeData) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} width={'100%'}>
            <Paper sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Left side: Logo */}
              <img 
                src="https://media.licdn.com/dms/image/v2/D4D0BAQHFvi8wAnpFdQ/company-logo_200_200/company-logo_200_200/0/1731679621888?e=2147483647&v=beta&t=zBQONtVJ9xFQXZIJ8ICIImAw5yvyay3VfAPpq2cE1CQ" // Replace this with the correct path to your image 
                style={{ height: 100 }} 
              />              
              {/* Right side: Text */}
              <Typography variant="h6">
                Camel Q  Software Solution PVT LTD
              </Typography>
            </Paper>
            <Paper sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5">
                Welcome, {employeeData.employeename}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} width={'100%'}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Typography>Employee ID: {employeeData.employeeId}</Typography>
                <Typography>Email: {employeeData.email}</Typography>
                <Typography>Designation: {employeeData.designation}</Typography>
                <Typography>Phone: {employeeData.phoneNumber}</Typography>
                <Typography>Location: {employeeData.Location}</Typography>
                <Typography>Joining Date: {employeeData.joiningDate}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} width={'100%'}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button variant="outlined" onClick={() => navigate('/ClockInOutForm')}>
                    Clock In/Out
                  </Button>
                  <Button variant="outlined" onClick={() => navigate('/Breakform')}>
                    Break Management
                  </Button>
                  <Button variant="outlined" onClick={() => navigate('/Leaverequestpage')}>
                    Leave Request
                  </Button>
                  <Button variant="outlined" onClick={() => navigate('/Employeepayslip')}>
                    payslip
                  </Button>
                  <Button variant="outlined" onClick={() => navigate('/holidaydisplay')}>
                    holidays
                  </Button>

                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} width={'100%'} sx={{marginLeft:'30%'}}>
               <Button sx={{marginLeft:3}} variant="contained" color="primary" onClick={handleLogout}>
                Logout
              </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}