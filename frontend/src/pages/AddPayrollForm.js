import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createPayroll } from '../../services/payrollService';

export default function AddPayrollForm({ onPayrollAdded }) {
  const [form, setForm] = useState({ periodName: '', payDate: '', description: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPayroll(form);
      setForm({ periodName: '', payDate: '', description: '' });
      onPayrollAdded();
    } catch (err) {
      console.error("Create payroll failed:", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField fullWidth label="Period Name" name="periodName" value={form.periodName} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Pay Date" name="payDate" type="date" value={form.payDate} onChange={handleChange} margin="normal" InputLabelProps={{ shrink: true }} />
      <TextField fullWidth label="Description" name="description" value={form.description} onChange={handleChange} margin="normal" />
      <Button type="submit" variant="contained">Add Payroll</Button>
    </Box>
  );
}
