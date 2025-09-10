import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeaveItem from '../components/leave/LeaveItem';
import HRNavbar from '../components/hr/HRNavbar';
import HRSidebar from '../components/hr/HRSidebar';
import {
  Box,
  Container,
  Typography,
  Paper
} from '@mui/material';

export default function HRLeaveApprovalPage() {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leaves");
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <>
      <HRNavbar />
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar */}
        <Box sx={{ width: 240 }}>
          <HRSidebar />
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, mt: 8, p: 3 }}>
          <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
              HR Leave Management
            </Typography>

            {leaves.map((leave) => (
              <Paper key={leave.id} sx={{ mb: 2, p: 2 }} elevation={2}>
                <LeaveItem leave={leave} onStatusChange={fetchLeaves} />
              </Paper>
            ))}

            {leaves.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No leave applications found.
              </Typography>
            )}
          </Container>
        </Box>
      </Box>
    </>
  );
}
