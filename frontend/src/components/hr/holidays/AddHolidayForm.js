import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { addHoliday } from '../../services/settingsService';

export default function AddHolidayForm({ onHolidayAdded }) {
  const [form, setForm] = useState({ name: '', date: '', description: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addHoliday(form);
      setForm({ name: '', date: '', description: '' });
      onHolidayAdded();
    } catch (err) {
      console.error("Error adding holiday:", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <TextField fullWidth name="name" label="Holiday Name" value={form.name} onChange={handleChange} margin="normal" required />
      <TextField fullWidth name="date" type="date" value={form.date} onChange={handleChange} margin="normal" required InputLabelProps={{ shrink: true }} />
      <TextField fullWidth name="description" label="Description" value={form.description} onChange={handleChange} margin="normal" />
      <Button type="submit" variant="contained" color="primary">Add Holiday</Button>
    </Box>
  );
}
