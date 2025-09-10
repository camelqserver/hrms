import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { getPayrolls } from '../../services/payrollService';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function PayrollCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        const res = await getPayrolls();
        const eventList = res.data.map(p => ({
          title: p.periodName,
          start: new Date(p.payDate),
          end: new Date(p.payDate),
          allDay: true
        }));
        setEvents(eventList);
      } catch (err) {
        console.error("Fetch payrolls error:", err);
      }
    };

    fetchPayrolls();
  }, []);

  return (
    <div>
      <h3>Payroll Calendar</h3>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
