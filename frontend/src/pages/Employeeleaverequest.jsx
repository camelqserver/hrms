import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import axios from 'axios';
import EmployeeNavbar from '../components/EmployeeNavbar';

const leaveTypes = ['Sick', 'Casual', 'Earned'];
const leaveStatuses = ['Pending', 'Approved', 'Rejected'];

export default function LeaveManagement() {
  const employeeId = localStorage.getItem('employeeId') || '';

  const [leaveData, setLeaveData] = useState({
    leaveType: '',
    fromDate: '',
    toDate: '',
    reason: ''
  });

  const [leaves, setLeaves] = useState([]);

  const handleChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
  };

  const applyLeave = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/leave/add', {
        ...leaveData,
        employeeId
      });
      alert('Leave applied successfully!');
      setLeaveData({ leaveType: '', fromDate: '', toDate: '', reason: '' });
      fetchLeaves();
    } catch (err) {
      console.error(err);
      alert('Failed to apply leave');
    }
  };

  const fetchLeaves = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/leave/get');
      setLeaves(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/leaves/${id}/status`, { status });
      alert(`Leave status updated to ${status}`);
      fetchLeaves();
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <>
    <EmployeeNavbar/>
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h5" gutterBottom>
            Apply for Leave
          </Typography>

          <FormControl fullWidth margin="normal">
            <InputLabel>Leave Type</InputLabel>
            <Select
              name="leaveType"
              value={leaveData.leaveType}
              onChange={handleChange}
              label="Leave Type"
            >
              {leaveTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            name="fromDate"
            type="date"
            label="From Date"
            value={leaveData.fromDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            name="toDate"
            type="date"
            label="To Date"
            value={leaveData.toDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            name="reason"
            label="Reason"
            value={leaveData.reason}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Button variant="contained" color="primary" onClick={applyLeave} fullWidth>
            Submit Leave
          </Button>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
          <Typography variant="h6">All Leave Requests</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>{leave.employeeId}</TableCell>
                  <TableCell>{leave.leaveType}</TableCell>
                  <TableCell>{leave.fromDate}</TableCell>
                  <TableCell>{leave.toDate}</TableCell>
                  <TableCell>{leave.reason}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
    </>
  );
}
