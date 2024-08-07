// src/components/flightHeader/BasicDateCalendar.js
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

export default function BasicDateCalendar({ onDateChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar onChange={(newDate) => onDateChange(dayjs(newDate).toDate())} />
    </LocalizationProvider>
  );
}
