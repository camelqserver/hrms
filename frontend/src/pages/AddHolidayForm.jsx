import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import HRNavbar from '../components/hr/HRNavbar';
import HRSidebar from '../components/hr/HRSidebar';

export default function AddHolidayForm() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/holidays', {
        title, date, description
      });
      alert('Holiday added');
      setTitle('');
      setDate('');
      setDescription('');
    } catch (err) {
      alert('Error adding holiday');
      console.error(err);
    }
  };

  return (
    <>
      <HRNavbar />
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: 240 }}>
          <HRSidebar />
        </Box>

        <Box sx={{ flexGrow: 1, mt: 8, p: 3 }}>
          <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Add Holiday
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                />
                <TextField
                  label="Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Add Holiday
                </Button>
              </form>
            </Paper>
          </Container>
        </Box>
      </Box>
    </>
  );
}
