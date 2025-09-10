import React, { useEffect, useState } from 'react';
import { getPayrolls, deletePayroll } from '../../services/payrollService';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

export default function PayrollList() {
  const [data, setData] = useState([]);

  const fetch = async () => {
    const res = await getPayrolls();
    setData(res.data);
  };

  const handleDelete = async (id) => {
    await deletePayroll(id);
    fetch();
  };

  useEffect(() => { fetch(); }, []);

  return (
    <div>
      <h3>Payroll Records</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Period</TableCell>
            <TableCell>Pay Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(pay => (
            <TableRow key={pay.id}>
              <TableCell>{pay.periodName}</TableCell>
              <TableCell>{pay.payDate}</TableCell>
              <TableCell>{pay.description}</TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(pay.id)} color="error">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
