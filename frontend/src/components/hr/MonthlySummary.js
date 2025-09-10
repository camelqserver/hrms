import React, { useState } from 'react';
import axios from 'axios';
import {
  Box, Typography, TextField, Button, Table, TableHead,
  TableRow, TableCell, TableBody
} from '@mui/material';
import HRNavbar from './HRNavbar';
import HRSidebar from './HRSidebar';


export default function MonthlySummary() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [summary, setSummary] = useState([]);

  const fetchSummary = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/monthly-summary', {
        params: { month, year },
      });
      setSummary(response.data);
    } catch (err) {
      console.error('Summary fetch error:', err);
      alert('Failed to load summary');
    }
  };

  return (
  <>
    <HRNavbar/>
    <HRSidebar/>
    <Box sx={{marginTop: 10, ml: '20%', width:'80%'}}>
      <Typography variant="h5" gutterBottom>Monthly Attendance Summary</Typography>

      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Month (e.g. 06)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <TextField
          label="Year (e.g. 2025)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <Button variant="contained" onClick={fetchSummary}>View Summary</Button>
      </Box>

      {summary.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Presents</TableCell>
              <TableCell>Absents</TableCell>
              <TableCell>Leaves</TableCell>
              <TableCell>LOPs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summary.map((emp, i) => (
              <TableRow key={i}>
                <TableCell>{emp.employeeId}</TableCell>
                <TableCell>{emp.presents}</TableCell>
                <TableCell>{emp.absents}</TableCell>
                <TableCell>{emp.leaves}</TableCell>
                <TableCell>{emp.lops}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
    </>
  );
}
