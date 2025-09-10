import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import EmployeeNavbar from '../components/EmployeeNavbar';

const EmployeePayslip = () => {
  const [payslips, setPayslips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const employeeId = localStorage.getItem('employeeId');

  useEffect(() => {
    if (!employeeId) {
      setError('Employee ID not found in local storage');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/payslips/${employeeId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error fetching payslips');
        return res.json();
      })
      .then((data) => {
        setPayslips(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load payslips');
        setLoading(false);
      });
  }, [employeeId]);

  if (loading) return <CircularProgress sx={{ marginTop: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <EmployeeNavbar />
      <Paper sx={{ padding: 2, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Payslips
        </Typography>
        {payslips.length === 0 ? (
          <Typography>No payslips available.</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Payslip ID</TableCell>
                  <TableCell>Month</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Basic Salary</TableCell>
                  <TableCell>Allowances</TableCell>
                  <TableCell>Deductions</TableCell>
                  <TableCell>Net Pay</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payslips.map((slip) => (
                  <TableRow key={slip.id}>
                    <TableCell>{slip.id}</TableCell>
                    <TableCell>{slip.month}</TableCell>
                    <TableCell>{slip.year}</TableCell>
                    <TableCell>{slip.basicSalary}</TableCell>
                    <TableCell>{slip.allowances}</TableCell>
                    <TableCell>{slip.deductions}</TableCell>
                    <TableCell>{slip.netPay}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </>
  );
};

export default EmployeePayslip;
