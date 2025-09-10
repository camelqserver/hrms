import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
  Link,
  TextField
} from '@mui/material';
import HRNavbar from './HRNavbar';
import HRSidebar from './HRSidebar';

export default function AttendanceTable() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/attendance');
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Failed to fetch attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGoogleMapsLink = (location) => {
    const encodedLocation = encodeURIComponent(location);
    return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  };

  // Filter records based on employee name or ID
  const filteredData = attendanceData.filter((record) =>
    (typeof record.employeeName === 'string' && record.employeeName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (typeof record.employeeId === 'string' && record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <HRNavbar />
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar on the left */}
        <Box sx={{ width: '240px', flexShrink: 0 }}>
          <HRSidebar />
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: '#f5f5f5',
            minHeight: '100vh',
            marginTop: '5%',
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
              Attendance Records
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
            ) : (
              <Paper elevation={3} sx={{ overflowX: 'auto' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#1976d2' }}>
                      <TableCell sx={{ color: '#fff' }}><b>Employee ID</b></TableCell>
                      <TableCell sx={{ color: '#fff' }}><b>Employee Name</b></TableCell>
                      <TableCell sx={{ color: '#fff' }}><b>Date</b></TableCell>
                      <TableCell sx={{ color: '#fff' }}><b>Clock In</b></TableCell>
                      <TableCell sx={{ color: '#fff' }}><b>Clock Out</b></TableCell>
                      <TableCell sx={{ color: '#fff' }}><b>Location</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{record.employeeId}</TableCell>
                        <TableCell>{record.employeeName || '-'}</TableCell>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.clockInTime || '-'}</TableCell>
                        <TableCell>{record.clockOutTime || '-'}</TableCell>
                        <TableCell>
                          {record.location ? (
                            <Link
                              href={getGoogleMapsLink(record.location)}
                              target="_blank"
                              rel="noopener"
                              underline="hover"
                              color="primary"
                            >
                              {record.location}
                            </Link>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            )}
          </Container>
        </Box>
      </Box>
    </>
  );
}
