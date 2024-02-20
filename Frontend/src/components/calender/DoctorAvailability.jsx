import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const DoctorAvailability = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Default to today's date
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  useEffect(() => {
    // Fetch available time slots when the selected date changes
    fetchAvailableTimeSlots(selectedDate.format('YYYY-MM-DD'));
  }, [selectedDate]);

  const fetchAvailableTimeSlots = async (date) => {
    try {
      // Make a request to your backend API
      const response = await axios.get(`/api/availability?date=${date}&doctorId=123`);
      
      // Update state with the fetched time slots
      setAvailableTimeSlots(response.data.availableTimeSlots || []); // Use an empty array if data is undefined
    } catch (error) {
      console.error('Error fetching available time slots:', error);
      // Handle errors and set availableTimeSlots to an empty array or display an error message
      setAvailableTimeSlots([]);
    }
  };

  const handleDateChange = (newDate) => {
    // Update the selected date when the user changes the date in the calendar
    setSelectedDate(newDate);
    // Reset selected time slot when the date changes
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    // Update the selected time slot when the user selects one
    setSelectedTimeSlot(timeSlot);
  };

  const handleBooking = () => {
    // Implement your booking logic here
    console.log('Booking:', selectedTimeSlot);
    // You can show a confirmation message, redirect, or trigger other actions
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
          minDate={dayjs()} // Set minimum date to the current date
        />
      </LocalizationProvider>

      <h2>Available Time Slots for {selectedDate.format('YYYY-MM-DD')}</h2>

      {availableTimeSlots && availableTimeSlots.length === 0 ? (
        <p>No slots available for the selected date.</p>
      ) : (
        <ul>
          {availableTimeSlots.map((timeSlot) => (
            <li
              key={timeSlot.id}
              onClick={() => handleTimeSlotSelect(timeSlot)}
              style={{ cursor: 'pointer', fontWeight: selectedTimeSlot === timeSlot ? 'bold' : 'normal' }}
            >
              {timeSlot.startTime} - {timeSlot.endTime}
            </li>
          ))}
        </ul>
      )}

      {selectedTimeSlot && (
        <button onClick={handleBooking} disabled={!selectedTimeSlot}>
          Book Appointment for {selectedTimeSlot.startTime} - {selectedTimeSlot.endTime}
        </button>
      )}
    </div>
  );
};

export default DoctorAvailability;
