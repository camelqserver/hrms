import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

import { getSalaries, createSalary } from "../services/salaryStructureService";
import HRNavbar from "../components/hr/HRNavbar";
import HRSidebar from "../components/hr/HRSidebar";

export default function SalaryStructurePage() {
  const [salaries, setSalaries] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State for search

  const [form, setForm] = useState({
    employeeId: '',
    name: '',
    basic: '',
    hra: '',
    conveyance: '',
    medicalallowances: '',
    specialallowances: '',
    proftax: '',
    pf: '',
    netSalary: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await getSalaries();
    setSalaries(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...form,
        employeeId: parseInt(form.employeeId),
        basic: parseFloat(form.basic),
        hra: parseFloat(form.hra),
        conveyance: parseFloat(form.conveyance),
        medicalallowances: parseFloat(form.medicalallowances),
        specialallowances: parseFloat(form.specialallowances),
        proftax: parseFloat(form.proftax),
        pf: parseFloat(form.pf),
        netSalary: parseFloat(form.netSalary)
      };

      await createSalary(formattedData);
      setForm({
        employeeId: '',
        name: '',
        basic: '',
        hra: '',
        conveyance: '',
        medicalallowances: '',
        specialallowances: '',
        proftax: '',
        pf: '',
        netSalary: ''
      });

      setOpenDialog(false);
      fetchData();
      alert('Salary structure added successfully');
    } catch (error) {
      alert('Failed to add salary structure');
    }
  };

  // Filter salaries based on search term
  const filteredSalaries = salaries.filter(s =>
    (s.name && s.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (s.employeeId && s.employeeId.toString().includes(searchTerm))
  );

  return (
    <>
      <HRNavbar />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: 240 }}>
          <HRSidebar />
        </Box>

        <Box sx={{ flexGrow: 1, mt: 8, p: 3 }}>
          <Container maxWidth="lg">
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5">Salary Structure Management</Typography>
                <Button variant="contained" onClick={() => setOpenDialog(true)}>
                  ➕ Add Salary Structure
                </Button>
              </Box>
            </Paper>

            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Salary Records
              </Typography>

              {/* Search Field */}
              <TextField
                label="Search by Employee Name or ID"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Employee ID</strong></TableCell>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Basic</strong></TableCell>
                    <TableCell><strong>HRA</strong></TableCell>
                    <TableCell><strong>Conveyance</strong></TableCell>
                    <TableCell><strong>Medical Allowances</strong></TableCell>
                    <TableCell><strong>Special Allowances</strong></TableCell>
                    <TableCell><strong>Prof Tax</strong></TableCell>
                    <TableCell><strong>PF Tax</strong></TableCell>
                    <TableCell><strong>Net Salary</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSalaries.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>{s.employeeId}</TableCell>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>₹{s.basic}</TableCell>
                      <TableCell>₹{s.hra}</TableCell>
                      <TableCell>₹{s.conveyance}</TableCell>
                      <TableCell>₹{s.medicalallowances}</TableCell>
                      <TableCell>₹{s.specialallowances}</TableCell>
                      <TableCell>₹{s.proftax}</TableCell>
                      <TableCell>₹{s.pf}</TableCell>
                      <TableCell><strong>₹{s.netSalary}</strong></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Container>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="md">
        <DialogTitle>Add Salary Structure</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Employee ID" fullWidth required
                  value={form.employeeId}
                  onChange={(e) => setForm({ ...form, employeeId: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Employee Name" fullWidth required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Basic" fullWidth required
                  value={form.basic}
                  onChange={(e) => setForm({ ...form, basic: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="HRA" fullWidth required
                  value={form.hra}
                  onChange={(e) => setForm({ ...form, hra: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Conveyance" fullWidth required
                  value={form.conveyance}
                  onChange={(e) => setForm({ ...form, conveyance: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Medical Allowances" fullWidth required
                  value={form.medicalallowances}
                  onChange={(e) => setForm({ ...form, medicalallowances: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Special Allowances" fullWidth required
                  value={form.specialallowances}
                  onChange={(e) => setForm({ ...form, specialallowances: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Prof Tax" fullWidth required
                  value={form.proftax}
                  onChange={(e) => setForm({ ...form, proftax: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="PF Tax" fullWidth required
                  value={form.pf}
                  onChange={(e) => setForm({ ...form, pf: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Net Salary" fullWidth required
                  value={form.netSalary}
                  onChange={(e) => setForm({ ...form, netSalary: e.target.value })} />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Add Salary</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
