// src/components/LeaveList.js

import React, { useEffect, useState } from 'react';
import { getAllLeaves, updateLeaveStatus } from '../../services/leaveService';
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Button, Paper, Typography
} from '@mui/material';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const data = await getAllLeaves();
      setLeaves(data);
    } catch (err) {
      alert('Failed to fetch leaves');
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateLeaveStatus(id, status);
      fetchLeaves();
    } catch (err) {
      alert('Failed to update leave status');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, margin: '20px auto', maxWidth: 900 }}>
      <Typography variant="h6" gutterBottom>Leave Requests</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee ID</TableCell>
            <TableCell>Employee Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaves.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>{leave.employeeName}</TableCell>
              <TableCell>{leave.leaveDate}</TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>{leave.status || 'Pending'}</TableCell>
              <TableCell>
                <Button
                  color="success"
                  onClick={() => handleStatusUpdate(leave.id, 'Approved')}
                  disabled={leave.status === 'Approved'}
                >
                  Approve
                </Button>
                <Button
                  color="error"
                  onClick={() => handleStatusUpdate(leave.id, 'Rejected')}
                  disabled={leave.status === 'Rejected'}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default LeaveList;
