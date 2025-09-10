import React, { useState } from 'react';
import { addAnnouncement } from '../services/announcementService';
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

import HRNavbar from '../components/hr/HRNavbar';
import HRSidebar from '../components/hr/HRSidebar';
import AnnouncementList from './AnnouncementList';

export default function AddAnnouncementForm() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('All');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAnnouncement({ title, message, role });
      alert('Announcement Posted!');
      setTitle('');
      setMessage('');
      setRole('All');
      setOpen(false);
    } catch (err) {
      console.error('Error posting announcement:', err);
      alert('Failed to post announcement: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <>
      <HRNavbar />
      <HRSidebar />
      <Container sx={{ mt: 10, ml: '15%', width: '100%' }}>
        <Typography variant="h4" gutterBottom>Announcements</Typography>

        <Button variant="contained" onClick={() => setOpen(true)}>
          ➕ Add Announcement
        </Button>

        <AnnouncementList />

        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>Add Announcement</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                margin="normal"
                required
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  value={role}
                  label="Role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Employee">Employee</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit} variant="contained">Post</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
