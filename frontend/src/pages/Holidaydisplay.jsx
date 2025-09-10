import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { createHoliday, getHolidays, deleteHoliday } from '../services/holidayService';
import EmployeeNavbar from '../components/EmployeeNavbar';

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
    setOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteHoliday(id);
    fetchHolidays();
  };

  return (
    <>
    <EmployeeNavbar/>
      <Box sx={{ display: 'flex' }}>


        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5">Holiday List</Typography>
          </Box>

          {/* Card Layout */}
          <Grid container spacing={3}>
            {holidays.map((holiday) => (
              <Grid item xs={12} sm={6} md={4} key={holiday.id}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6">{holiday.title}</Typography>
                    <Typography color="textSecondary">{holiday.date}</Typography>
                    <Typography sx={{ mt: 1 }}>{holiday.description}</Typography>
                  </CardContent>
                  <CardActions>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

        </Box>
      </Box>
    </>
  );
}
