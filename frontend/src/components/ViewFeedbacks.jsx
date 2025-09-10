import React, { useEffect, useState } from 'react';
import { getAllFeedbacks, respondToFeedback } from '../services/feedbackService';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from '@mui/material';

export default function ViewFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await getAllFeedbacks();
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Failed to fetch feedbacks:', error);
        alert('Failed to load feedbacks: ' + (error.response?.data?.error || error.message));
      }
    };
    fetchFeedbacks();
  }, []);

  const respond = async (id) => {
    try {
      const response = prompt("Enter response:");
      const status = prompt("Update status (Submitted/In Progress/Resolved):");
      if (response && status) {
        await respondToFeedback(id, { response, status });
        alert('Response sent successfully');
        // Refresh feedbacks list
        const updatedFeedbacks = await getAllFeedbacks();
        setFeedbacks(updatedFeedbacks.data);
      }
    } catch (error) {
      alert('Failed to send response: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 3, }}>
      <Typography variant="h5" gutterBottom>
        Employee Feedbacks
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>EmployeeId</b></TableCell>
              <TableCell><b>Subject</b></TableCell>
              <TableCell><b>Message</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.map((fb) => (
              <TableRow key={fb.id}>
                <TableCell>{fb.employeeId}</TableCell>
                <TableCell>{fb.subject}</TableCell>
                <TableCell>{fb.message}</TableCell>
                <TableCell>{fb.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => respond(fb.id)}
                  >
                    Respond
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {feedbacks.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No feedbacks available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
