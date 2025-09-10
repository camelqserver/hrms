import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getEmployees, addEmployee, deleteEmployee, updateEmployee } from '../services/employeeService';
import HRNavbar from '../components/hr/HRNavbar';
import HRSidebar from '../components/hr/HRSidebar';

export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false); // Controls popup visibility
  const [searchTerm, setSearchTerm] = useState(''); // Search term state

  const [form, setForm] = useState({
    username: '',
    Password: '',
    employeeId: '',
    employeename: '',
    email: '',
    designation: '',
    phoneNumber: '',
    Location: '',
    joiningDate: '',
    status: ''
  });

  const fetchData = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    await addEmployee(form);
    setForm({
      username: '',
      Password: '',
      employeeId: '',
      employeename: '',
      email: '',
      designation: '',
      phoneNumber: '',
      Location: '',
      joiningDate: '',
      status: ''
    });
    setOpen(false);
    fetchData();
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchData();
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((emp) =>
    emp.employeename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <HRNavbar />
      <HRSidebar />
      <Container sx={{ mt: 10, width: '100%', marginLeft: '17%' }}>
        <Typography variant="h4" gutterBottom>
          Employee Management
        </Typography>

        <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
          Add Employee
        </Button>

        {/* Search Field */}
        <TextField
          fullWidth
          label="Search by Name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Add Employee Form in Popup */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Password" value={form.Password} onChange={(e) => setForm({ ...form, Password: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Employee ID" value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Employee Name" value={form.employeename} onChange={(e) => setForm({ ...form, employeename: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Phone Number" value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Location" value={form.Location} onChange={(e) => setForm({ ...form, Location: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth type="date" label="Joining Date" InputLabelProps={{ shrink: true }} value={form.joiningDate} onChange={(e) => setForm({ ...form, joiningDate: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>Save</Button>
          </DialogActions>
        </Dialog>

        <Paper elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Employee ID</strong></TableCell>
                <TableCell><strong>Employee Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Designation</strong></TableCell>
                <TableCell><strong>Phone Number</strong></TableCell>
                <TableCell><strong>Location</strong></TableCell>
                <TableCell><strong>Joining Date</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.employeeId}</TableCell>
                  <TableCell>{emp.employeename}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.designation}</TableCell>
                  <TableCell>{emp.phoneNumber}</TableCell>
                  <TableCell>{emp.Location}</TableCell>
                  <TableCell>{emp.joiningDate}</TableCell>
                  <TableCell>{emp.status}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => updateEmployee(emp.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(emp.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </>
  );
}
