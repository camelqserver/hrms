import React from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack
} from '@mui/material';

export default function LeaveItem({ leave, onStatusChange }) {
  const handleStatusUpdate = async (status) => {
    try {
      await axios.put(`http://localhost:5000/api/leaves/${leave.id}/status`, { status });
      onStatusChange(); // Refresh parent list
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle1"><strong>Employee ID:</strong> {leave.employeeId}</Typography>
        <Typography variant="body1"><strong>Leave Type:</strong> {leave.leaveType}</Typography>
        <Typography variant="body1"><strong>From:</strong> {leave.fromDate}</Typography>
        <Typography variant="body1"><strong>To:</strong> {leave.toDate}</Typography>
        <Typography variant="body1"><strong>Reason:</strong> {leave.reason}</Typography>
        <Typography variant="body1" sx={{ mb: 1 }}><strong>Status:</strong> {leave.status}</Typography>

        {leave.status === 'Pending' && (
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="success" onClick={() => handleStatusUpdate('Approved')}>
              Approve
            </Button>
            <Button variant="contained" color="error" onClick={() => handleStatusUpdate('Rejected')}>
              Reject
            </Button>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
