// src/components/LeaveForm.js

import React, { useState } from 'react';
import { applyLeave } from '../../services/leaveService';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    leaveDate: '',
    reason: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyLeave(formData);
      alert('Leave applied successfully!');
      setFormData({ employeeName: '', leaveDate: '', reason: '' });
    } catch (err) {
      alert('Error applying leave');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 500, margin: '20px auto' }}>
      <Typography variant="h6" gutterBottom>Apply for Leave</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Employee Name"
          name="employeeName"
          value={formData.employeeName}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Leave Date"
          name="leaveDate"
          type="date"
          value={formData.leaveDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>Submit</Button>
      </form>
    </Paper>
  );
};

export default LeaveForm;
