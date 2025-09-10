import React, { useState, useEffect } from 'react';
import { clockIn, clockOut, getAttendance } from '../services/clockinoutService';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper
} from '@mui/material';
import EmployeeNavbar from '../components/EmployeeNavbar';

export default function ClockInOutForm() {
  // Get employeeId and employeeName from localStorage (assuming it's set on login)
  const employeeId = localStorage.getItem("employeeId") || "";
  const employeeName = localStorage.getItem("employeeName") || "";

  const [location, setLocation] = useState('');
  const [clockInTime, setClockInTime] = useState(localStorage.getItem(`clockInTime_${employeeId}`) || '');
  const [clockOutTime, setClockOutTime] = useState('');
  const [remarks, setRemarks] = useState('');
  const [elapsedTime, setElapsedTime] = useState('');

  const date = new Date().toISOString().split('T')[0];

  // Get current IST time
  const getCurrentISTTime = () => {
    const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const hours = String(ist.getHours()).padStart(2, '0');
    const minutes = String(ist.getMinutes()).padStart(2, '0');
    const seconds = String(ist.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // Get user location
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = pos.coords;
          setLocation(`${coords.latitude},${coords.longitude}`);
        },
        (err) => {
          alert("Failed to get location. Please allow location access.");
          console.error(err);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  // Fetch attendance record from backend on load
  useEffect(() => {
    const fetchAttendance = async () => {
      if (employeeId && date) {
        try {
          const response = await getAttendance(employeeId, date);
          if (response.data) {
            setClockInTime(response.data.clockInTime || '');
            setClockOutTime(response.data.clockOutTime || '');
            if (response.data.clockInTime) {
              localStorage.setItem(`clockInTime_${employeeId}`, response.data.clockInTime);
            }
          }
        } catch (err) {
          console.log('No attendance record found for today');
        }
      }
    };
    fetchAttendance();
  }, [employeeId, date]);

  // Timer logic
  useEffect(() => {
    let interval;

    if (clockInTime && !clockOutTime) {
      interval = setInterval(() => {
        const start = new Date(`${date}T${clockInTime}`);
        const now = new Date();
        const diff = Math.floor((now - start) / 1000);
        const hrs = String(Math.floor(diff / 3600)).padStart(2, '0');
        const mins = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
        const secs = String(diff % 60).padStart(2, '0');
        setElapsedTime(`${hrs}:${mins}:${secs}`);
      }, 1000);
    }

    if (clockInTime && clockOutTime) {
      const start = new Date(`${date}T${clockInTime}`);
      const end = new Date(`${date}T${clockOutTime}`);
      const diff = Math.floor((end - start) / 1000);
      const hrs = String(Math.floor(diff / 3600)).padStart(2, '0');
      const mins = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const secs = String(diff % 60).padStart(2, '0');
      setElapsedTime(`${hrs}:${mins}:${secs}`);
    }

    return () => clearInterval(interval);
  }, [clockInTime, clockOutTime, date]);

  const handleClockIn = async () => {
    const timeNow = getCurrentISTTime();

    if (!employeeId || !location || !timeNow) {
      alert("Missing required field: employee ID, location, or time");
      return;
    }

    const payload = {
      employeeId,
      employeeName,
      date,
      clockInTime: timeNow,
      location,
      remarks
    };

    console.log("Clock In Payload:", payload);

    try {
      await clockIn(payload);
      setClockInTime(timeNow);
      localStorage.setItem(`clockInTime_${employeeId}`, timeNow);
      alert(`✅ Clocked in successfully at ${timeNow}`);
    } catch (err) {
      alert("❌ Already clocked in today ");
    }
  };

  const handleClockOut = async () => {
    const timeNow = getCurrentISTTime();

    if (!employeeId || !timeNow) {
      alert("Missing required field: employee ID or time");
      return;
    }

    const payload = {
      employeeId,
      date,
      clockOutTime: timeNow,
      remarks
    };

    console.log("Clock Out Payload:", payload);

    try {
      await clockOut(payload);
      setClockOutTime(timeNow);
      localStorage.removeItem(`clockInTime_${employeeId}`);
      alert(`✅ Clocked out successfully at ${timeNow}`);

      // Wait a bit then reload
      setTimeout(() => {
        window.location.reload();
      }, 3000);

    } catch (err) {
      alert("❌ Clock-out failed: " + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <EmployeeNavbar />
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Clock In / Clock Out
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} display={'flex'}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Employee ID:
            </Typography>
            <Typography variant="body1" marginLeft={1} marginTop={0.2}>{employeeId}</Typography>
          </Grid>

          <Grid item xs={12} display={'flex'}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Date:
            </Typography>
            <Typography variant="body1" marginLeft={1} marginTop={0.2}>{date}</Typography>
          </Grid>

          {clockInTime && (
            <Grid item xs={12} textAlign="center">
              <Typography variant="h6" color="green">
                Clocked in at: {clockInTime}
              </Typography>
              {clockOutTime && (
                <Typography variant="h6" color="red">
                  Clocked out at: {clockOutTime}
                </Typography>
              )}
              <Typography variant="h6" color="blue">
                ⏱ Worked Time: {elapsedTime}
              </Typography>
            </Grid>
          )}

          {!clockInTime && (
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button
                variant="contained"
                onClick={handleClockIn}
                sx={{
                  backgroundColor: 'green',
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  '&:hover': {
                    backgroundColor: 'darkgreen',
                  }
                }}
              >
                Clock In
              </Button>
            </Grid>
          )}

          <Grid item xs={10}>
            <TextField
              fullWidth
              label="Location (Lat, Long)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="outlined" onClick={fetchLocation}>📍</Button>
          </Grid>

          {clockInTime && !clockOutTime && (
            <Grid item xs={12} marginLeft={'25%'}>
              <Button
                variant="contained"
                onClick={handleClockOut}
                sx={{
                  backgroundColor: 'red',
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  '&:hover': {
                    backgroundColor: 'darkred',
                  }
                }}
              >
                Clock Out
              </Button>
            </Grid>
          )}
        </Grid>
      </Paper>
    </>
  );
}
