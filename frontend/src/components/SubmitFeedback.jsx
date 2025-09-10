import React, { useState } from 'react';
import { submitFeedback } from '../services/feedbackService';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import HRNavbar from './hr/HRNavbar';
import HRSidebar from './hr/HRSidebar';
import ViewFeedbacks from './ViewFeedbacks';

export default function SubmitFeedback() {
  const [form, setForm] = useState({
    employeeId: '',
    subject: '',
    message: ''
  });

  const [open, setOpen] = useState(false); // state for modal visibility

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitFeedback(form);
      alert('Feedback Submitted Successfully');
      setForm({ employeeId: '', subject: '', message: '' });
      setOpen(false); // close the modal on success
    } catch (error) {
      alert('Failed to submit feedback: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <>
      <HRNavbar />
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar */}
        <Box sx={{ width: 240 }}>
          <HRSidebar />
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, mt: 8, p: 2, }}>
          <Container maxWidth="80%">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" gutterBottom>
                Feedback / Grievance
              </Typography>
              <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Add Feedback
              </Button>
            </Box>

            <ViewFeedbacks />
          </Container>
        </Box>
      </Box>

      {/* Modal Form */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Submit Feedback / Grievance</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              name="employeeId"
              label="Employee ID"
              value={form.employeeId}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="subject"
              label="Subject"
              value={form.subject}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="message"
              label="Message"
              value={form.message}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
