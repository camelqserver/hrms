import React, { useEffect, useState } from 'react';
import { getSettings, saveSettings } from '../services/settings-Service';
import { TextField, Button, Typography, Box, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import HRNavbar from '../components/hr/HRNavbar';
import HRSidebar from '../components/hr/HRSidebar';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AdminSettings = () => {
  const [form, setForm] = useState({
    companyName: '',
    timezone: '',
    workDays: [],
    clockInFrom: '',
    clockInTo: '',
  });

useEffect(() => {
  getSettings().then(res => {
    if (res.data) {
      setForm({
        companyName: res.data.companyName || '',
        timezone: res.data.timezone || '',
        workDays: res.data.workDays || [], // ✅ fallback to []
        clockInFrom: res.data.clockInFrom || '',
        clockInTo: res.data.clockInTo || '',
      });
    }
  });
}, []);


  const handleCheckboxChange = (day) => {
    const updatedDays = form.workDays.includes(day)
      ? form.workDays.filter(d => d !== day)
      : [...form.workDays, day];
    setForm({ ...form, workDays: updatedDays });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveSettings(form);
    alert("Settings saved");
  };

  return (
    <>
    <HRNavbar/>
    <HRSidebar/>
    <Box p={4} sx={{mt:5, width:'73%', ml:'20%'}}>
      <Typography variant="h5">Admin Settings</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Company Name"
          fullWidth
          margin="normal"
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
        />
        <TextField
          label="Time Zone"
          fullWidth
          margin="normal"
          value={form.timezone}
          onChange={(e) => setForm({ ...form, timezone: e.target.value })}
        />
        <Typography mt={2}>Work Days:</Typography>
        <FormGroup row>
          {days.map((day) => (
            <FormControlLabel
              key={day}
              control={
                <Checkbox
                  checked={form.workDays.includes(day)}
                  onChange={() => handleCheckboxChange(day)}
                />
              }
              label={day}
            />
          ))}
        </FormGroup>
        <TextField
          type="time"
          label="Clock In From"
          fullWidth
          margin="normal"
          value={form.clockInFrom}
          onChange={(e) => setForm({ ...form, clockInFrom: e.target.value })}
        //   InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="time"
          label="Clock In To"
          fullWidth
          margin="normal"
          value={form.clockInTo}
          onChange={(e) => setForm({ ...form, clockInTo: e.target.value })}
        //   InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" type="submit">Save</Button>
      </form>
    </Box>
    </>
  );
};

export default AdminSettings;
