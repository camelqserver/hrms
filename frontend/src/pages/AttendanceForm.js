import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography } from '@mui/material';

export default function AttendanceForm() {
  const [clockInTime, setClockInTime] = useState('');
  const [clockOutTime, setClockOutTime] = useState('');
  const [location, setLocation] = useState('');
  const employeeId = 1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date().toISOString().split("T")[0];

    try {
      await axios.post('http://localhost:5000/api/attendance', {
        employeeId,
        date,
        clockInTime,
        clockOutTime,
        location
      });
      alert('Attendance saved');
    } catch (err) {
      alert('Error saving attendance');
      console.error(err);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h6">Mark Attendance</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Clock In Time"
          type="time"
          fullWidth
          value={clockInTime}
          onChange={(e) => setClockInTime(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Clock Out Time"
          type="time"
          fullWidth
          value={clockOutTime}
          onChange={(e) => setClockOutTime(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Location"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Submit</Button>
      </form>
    </Box>
  );
}
