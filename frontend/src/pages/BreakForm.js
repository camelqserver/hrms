import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Paper, Typography, Grid, TextField, Button
} from '@mui/material';
import EmployeeNavbar from '../components/EmployeeNavbar';

export default function BreakForm() {
  const [employeeId, setEmployeeId] = useState('');
  const [breakStart, setBreakStart] = useState('');
  const [breakEnd, setBreakEnd] = useState('');
  const [clockInTime, setClockInTime] = useState('');
  const [clockOutTime, setClockOutTime] = useState('');
  const [date, setDate] = useState('');

  // Get today's date on load
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);

    // Get employeeId from localStorage
    const storedEmployeeId = localStorage.getItem("employeeId");
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
    } else {
      alert("Employee not logged in.");
    }

    setClockInTime(localStorage.getItem('clockInTime') || '');
    setClockOutTime(localStorage.getItem('clockOutTime') || '');
  }, []);

  const getCurrentISTTime = () => {
    const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const hours = String(ist.getHours()).padStart(2, '0');
    const minutes = String(ist.getMinutes()).padStart(2, '0');
    const seconds = String(ist.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const startBreak = async () => {
    if (!clockInTime) {
      alert("❌ You must clock in before starting a break.");
      return;
    }

    const timeNow = getCurrentISTTime();
    setBreakStart(timeNow);

    try {
      await axios.post('http://localhost:5000/api/break/start', {
        employeeId,
        date,
        breakStart: timeNow
      });
      alert(`✅ Break started at ${timeNow}`);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to start break: " + (err?.response?.data?.error || err.message));
    }
  };

const endBreak = async () => {
  if (!breakStart) {
    alert("❌ Please start a break before ending it.");
    return;
  }

  const timeNow = getCurrentISTTime();
  setBreakEnd(timeNow);

  try {
    await axios.post('http://localhost:5000/api/break/end', {
      employeeId,
      date,
      breakEnd: timeNow
    });
    alert(`✅ Break ended at ${timeNow}`);
    
    // Refresh page after a short delay (to let alert show)
    setTimeout(() => {
      window.location.reload();
    }, 500); // optional: delay to show alert
  } catch (err) {
    console.error(err);
    alert("❌ Failed to end break: " + (err?.response?.data?.error || err.message));
  }
};


  const isClockedIn = clockInTime && !clockOutTime;

  return (
    <>
      <EmployeeNavbar />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom align="center">
            Break Management
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography><strong>Employee ID:</strong> {employeeId}</Typography>
              <Typography><strong>Date:</strong> {date}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography color={clockInTime ? 'green' : 'textSecondary'}>
                {clockInTime ? `Clocked in at: ${clockInTime}` : 'Not clocked in yet'}
              </Typography>
              {clockOutTime && (
                <Typography color="red">Clocked out at: {clockOutTime}</Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Break Start"
                fullWidth
                value={breakStart}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={startBreak}
                disabled={!isClockedIn}
              >
                Start Break
              </Button>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Break End"
                fullWidth
                value={breakEnd}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={endBreak}
                disabled={!breakStart}
              >
                End Break
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
