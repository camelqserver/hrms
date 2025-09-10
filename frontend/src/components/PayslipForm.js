import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

const PayslipForm = () => {
  const initialState = {
    employeeId: "",
    name: "",
    joiningDate: "",
    designation: "",
    department: "",
    location: "",
    workingdays: "",
    lopDays: "",
    lopamount: "",
    bankname: "",
    bankaccountnumber: "",
    month: "",
    year: "",
    basic: "",
    da: "",
    hra: "",
    conveyance: "",
    medicalallowances: "",
    specialallowances: "",
    proftax: "",
    pf: "",
    netSalary: "",
  };

  const [form, setForm] = useState(initialState);

  // ✅ Percentages (Editable by HR/Admin)
  const [percentages, setPercentages] = useState({
    basic: 0.4,
    da: 0.04,
    hra: 0.08,
    conveyance: 0.042,
    medicalallowances: 0.033,
    specialallowances: 0.0356,
    pf: 0.048,
    proftax: 0.05,
  });

  // ✅ Allocate based on Net Salary
  const allocateSalary = (netSalary, customPercents = percentages) => {
    const ns = +netSalary || 0;
    return Object.fromEntries(
      Object.entries(customPercents).map(([key, percent]) => [
        key,
        (ns * percent).toFixed(2),
      ])
    );
  };

  // ✅ Handle normal field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "netSalary") {
      const salaryComponents = allocateSalary(value);
      setForm({
        ...form,
        [name]: value,
        ...salaryComponents,
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ✅ Handle percentage changes
  const handlePercentageChange = (e) => {
    const { name, value } = e.target;
    const updatedPercents = {
      ...percentages,
      [name]: parseFloat(value) || 0,
    };
    setPercentages(updatedPercents);

    // Recalculate salary if Net Salary is already entered
    if (form.netSalary) {
      const salaryComponents = allocateSalary(form.netSalary, updatedPercents);
      setForm({ ...form, ...salaryComponents });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("📤 Submitting form:", form);

      const response = await axios.post(
        "http://localhost:5000/api/payslips/create",
        {
          ...form,
          basic: Number(form.basic),
          da: Number(form.da),
          hra: Number(form.hra),
          conveyance: Number(form.conveyance),
          medicalallowances: Number(form.medicalallowances),
          specialallowances: Number(form.specialallowances),
          pf: Number(form.pf),
          proftax: Number(form.proftax),
          netSalary: Number(form.netSalary),
          workingdays: Number(form.workingdays) || 0,
          lopDays: Number(form.lopDays) || 0,
          lopamount: Number(form.lopamount) || 0,
        }
      );

      alert("✅ Payslip generated successfully!");
      console.log("✅ Server Response:", response.data);

      setForm(initialState);
    } catch (err) {
      console.error("❌ Error details:", err.response?.data || err.message);
      alert(
        "❌ Error generating payslip: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: "80%", mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Generate Payslip
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Employee Info */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Employee ID"
              name="employeeId"
              value={form.employeeId}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Joining Date"
              name="joiningDate"
              value={form.joiningDate}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Designation"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Department"
              name="department"
              value={form.department}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Work & Bank Info */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Working Days"
              name="workingdays"
              value={form.workingdays}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="LOP Days"
              name="lopDays"
              value={form.lopDays}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="LOP Amount"
              name="lopamount"
              value={form.lopamount}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Bank Name"
              name="bankname"
              value={form.bankname}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Bank Account Number"
              name="bankaccountnumber"
              value={form.bankaccountnumber}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Month"
              name="month"
              value={form.month}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Year"
              name="year"
              value={form.year}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Net Salary */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Net Salary"
              name="netSalary"
              value={form.netSalary}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>

          {/* Editable Percentages */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Salary Percentages (Editable)
            </Typography>
          </Grid>
          {Object.keys(percentages).map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                label={`${field} %`}
                name={field}
                type="number"
                value={percentages[field]}
                onChange={handlePercentageChange}
                fullWidth
              />
            </Grid>
          ))}

          {/* Auto-Filled Salary Components */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Salary Breakdown
            </Typography>
          </Grid>
          {[
            "basic",
            "da",
            "hra",
            "conveyance",
            "medicalallowances",
            "specialallowances",
            "pf",
            "proftax",
          ].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                label={field.replace(/^\w/, (c) => c.toUpperCase())}
                name={field}
                value={form[field]}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Grid>
          ))}

          {/* Submit */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Generate Payslip
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default PayslipForm;