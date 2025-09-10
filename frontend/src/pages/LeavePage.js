import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Box,
} from '@mui/material';
import HRNavbar from '../components/hr/HRNavbar';
import HRSidebar from '../components/hr/HRSidebar';

export default function LeaveTable() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const fetchLeaveData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/leave/get');
      setLeaves(response.data);
    } catch (err) {
      console.error('Error fetching leave data:', err);
      setError('Failed to load leave records.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/leave/${id}/status`, {
        status: newStatus,
      });

      setLeaves((prev) =>
        prev.map((leave) =>
          leave.id === id ? { ...leave, status: newStatus } : leave
        )
      );
    } catch (error) {
      console.error('Failed to update status:', error);
      setError('Failed to update leave status.');
    }
  };

  // Filter leaves based on employee name or employee ID
  const filteredLeaves = leaves.filter((leave) =>
    (leave.employeeName && leave.employeeName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (leave.employeeId && leave.employeeId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <HRNavbar />
      <HRSidebar />
      <Box maxWidth={'100%'} sx={{ marginLeft: '10%', marginTop: '5%' }}>
        <Container>
          <Typography variant="h4" gutterBottom>
            Leaves
          </Typography>

          {/* Search Field */}
          <TextField
            fullWidth
            label="Search by Employee Name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />

          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Paper elevation={3} sx={{ overflowX: 'auto' }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#1976d2' }}>
                  <TableRow>
                    <TableCell sx={{ color: 'white' }}><b>ID</b></TableCell>
                    <TableCell sx={{ color: 'white' }}><b>Employee ID</b></TableCell>
                    <TableCell sx={{ color: 'white' }}><b>Employee Name</b></TableCell>
                    <TableCell sx={{ color: 'white' }}><b>From Date</b></TableCell>
                    <TableCell sx={{ color: 'white' }}><b>To Date</b></TableCell>
                    <TableCell sx={{ color: 'white' }}><b>Reason</b></TableCell>
                    <TableCell sx={{ color: 'white' }}><b>Status</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLeaves.map((leave) => (
                    <TableRow key={leave.id}>
                      <TableCell>{leave.id}</TableCell>
                      <TableCell>{leave.employeeId}</TableCell>
                      <TableCell>{leave.employeeName}</TableCell>
                      <TableCell>{leave.fromDate}</TableCell>
                      <TableCell>{leave.toDate}</TableCell>
                      <TableCell>{leave.reason}</TableCell>
                      <TableCell>
                        <FormControl fullWidth size="small">
                          <Select
                            value={leave.status}
                            onChange={(e) =>
                              handleStatusChange(leave.id, e.target.value)
                            }
                          >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Approved">Approved</MenuItem>
                            <MenuItem value="Rejected">Rejected</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        </Container>
      </Box>
    </>
  );
}
