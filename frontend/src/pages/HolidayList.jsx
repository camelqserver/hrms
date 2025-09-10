import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, Table, TableRow, TableHead,
  TableCell, TableBody, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { createHoliday, getHolidays, deleteHoliday } from '../services/holidayService';
import HRNavbar from '../components/hr/HRNavbar';
import HRSidebar from '../components/hr/HRSidebar';

export default function HolidayList() {
  const [holidays, setHolidays] = useState([]);
  const [form, setForm] = useState({ title: '', date: '', description: '' });
  const [open, setOpen] = useState(false);

  const fetchHolidays = async () => {
    const res = await getHolidays();
    setHolidays(res.data);
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createHoliday(form);
    setForm({ title: '', date: '', description: '' });
    fetchHolidays();
    setOpen(false); // Close the dialog
  };

  const handleDelete = async (id) => {
    await deleteHoliday(id);
    fetchHolidays();
  };

  return (
    <>
      <HRNavbar />
      <HRSidebar />
      <Box sx={{ mt: 10, ml: '20%', mr: '5%' }}>
        <Typography variant="h5" gutterBottom>
          Holiday List
        </Typography>

        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add Holiday
        </Button>

        {/* 🚀 Modal Dialog Form */}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add New Holiday</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                fullWidth margin="normal"
              />
              <TextField
                label="Date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth margin="normal"
              />
              <TextField
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                fullWidth margin="normal"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">Add</Button>
          </DialogActions>
        </Dialog>

        {/* Holiday Table */}
        <Table sx={{ mt: 3 }}>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holidays.map((holiday) => (
              <TableRow key={holiday.id}>
                <TableCell>{holiday.title}</TableCell>
                <TableCell>{holiday.date}</TableCell>
                <TableCell>{holiday.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(holiday.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
