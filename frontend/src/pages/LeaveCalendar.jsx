// src/components/leave/LeaveCalendar.jsx
import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import axios from 'axios';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function LeaveCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/leaves')
      .then(res => {
        const calendarEvents = res.data.map(leave => ({
          title: `${leave.leaveType} (${leave.status})`,
          start: new Date(leave.startDate),
          end: new Date(leave.endDate),
          allDay: true,
        }));
        setEvents(calendarEvents);
      })
      .catch(err => console.error('Calendar load error:', err));
  }, []);

  return (
    <div style={{ height: '80vh', margin: '2rem' }}>
      <h2>Leave Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
    </div>
  );
}
