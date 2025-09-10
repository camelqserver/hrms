import React, { useEffect, useState } from 'react';
import { getHolidays, deleteHoliday } from '../../services/settingsService';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

export default function HolidayList() {
  const [holidays, setHolidays] = useState([]);

  const fetchHolidays = async () => {
    try {
      const res = await getHolidays();
      setHolidays(res.data);
    } catch (err) {
      console.error("Error fetching holidays:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHoliday(id);
      fetchHolidays();
    } catch (err) {
      console.error("Error deleting holiday:", err);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  return (
    <div>
      <h3>Holiday List</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Holiday</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {holidays.map((holiday) => (
            <TableRow key={holiday.id}>
              <TableCell>{holiday.name}</TableCell>
              <TableCell>{holiday.date}</TableCell>
              <TableCell>{holiday.description}</TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(holiday.id)} color="error">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
