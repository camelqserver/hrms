import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import HRNavbar from '../components/hr/HRNavbar';
import HRSidebar from '../components/hr/HRSidebar';

export default function MonthlySummaryPage() {
  const [records, setRecords] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const fetchSummary = async () => {
    try {
      const res = await axios.get(`/api/attendance/monthly-summary?month=${month}&year=${year}`);
      setRecords(res.data);
    } catch (err) {
      alert("Failed to load data");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Monthly Attendance Summary - ${month}/${year}`, 20, 10);
    doc.autoTable({
      head: [['Employee ID', 'Date', 'Clock In', 'Clock Out', 'Location']],
      body: records.map((rec) => [
        rec.employeeId,
        rec.date,
        rec.clockInTime || 'N/A',
        rec.clockOutTime || 'N/A',
        rec.location || 'N/A',
      ]),
    });
    doc.save(`Attendance_${month}_${year}.pdf`);
  };

  return (
    <>
      <HRNavbar />
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: 240 }}>
          <HRSidebar />
        </Box>

        <Box sx={{ flexGrow: 1, mt: 8, p: 3 }}>
          <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
              Monthly Attendance Summary
            </Typography>

            <Grid container spacing={2} mb={2}>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Month (MM)"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Year (YYYY)"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} display="flex" alignItems="center" gap={2}>
                <Button variant="contained" color="primary" onClick={fetchSummary}>
                  Fetch
                </Button>
                <Button variant="outlined" color="secondary" onClick={generatePDF}>
                  Export PDF
                </Button>
              </Grid>
            </Grid>

            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: '#1976d2' }}>
                  <TableRow>
                    <TableCell sx={{ color: '#fff' }}>Employee ID</TableCell>
                    <TableCell sx={{ color: '#fff' }}>Date</TableCell>
                    <TableCell sx={{ color: '#fff' }}>Clock In</TableCell>
                    <TableCell sx={{ color: '#fff' }}>Clock Out</TableCell>
                    <TableCell sx={{ color: '#fff' }}>Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {records.map((rec, index) => (
                    <TableRow key={index}>
                      <TableCell>{rec.employeeId}</TableCell>
                      <TableCell>{rec.date}</TableCell>
                      <TableCell>{rec.clockInTime || 'N/A'}</TableCell>
                      <TableCell>{rec.clockOutTime || 'N/A'}</TableCell>
                      <TableCell>{rec.location || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                  {records.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No records found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
      </Box>
    </>
  );
}
