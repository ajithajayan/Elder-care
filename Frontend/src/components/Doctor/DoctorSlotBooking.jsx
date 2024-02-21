// DoctorSlotBooking.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Timer from "../Timer/Timer";
import { toast } from "react-toastify";

const DoctorSlotBooking = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [timeSlots, setTimeSlots] = useState([]);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);

  const currentTime = dayjs(new Date());

  useEffect(() => {
    // Fetch existing time slots for the selected date and update state
    axios
      .get(`/api/getSlots?date=${selectedDate.format("YYYY-MM-DD")}`)
      .then((response) => {
        setTimeSlots(response.data.slots || []);
      })
      .catch((error) => {
        console.error("Error fetching existing time slots:", error);
      });
  }, [selectedDate]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleFromTimeChange = (newTime) => {
    setFromTime(newTime);
  };

  const handleToTimeChange = (newTime) => {
    setToTime(newTime);
  };

  const handleSaveSlots = () => {
    if (fromTime && toTime) {
      const fromTimeFormatted = dayjs(fromTime).format();
      const toTimeFormatted = dayjs(toTime).format();
      const newSlot = { from: fromTimeFormatted, to: toTimeFormatted };
      const updatedSlots = [...timeSlots, newSlot];

      console.log("this will remark the actual concept",newSlot)
      // Make an API call to update time slots for the selected date
      axios
        .post(`/api/updateSlots`, {
          date: selectedDate.format("YYYY-MM-DD"),
          slots: newSlot,
        })
        .then((response) => {
          // Update state with the newly saved slots
          setTimeSlots(newSlot);
        })
        .catch((error) => {
          console.error("Error updating time slots:", error);
        });

      // Reset the selected times after saving
      setFromTime(null);
      setToTime(null);
    }else{
      toast.warning("Please select from and to time")
    }
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
          minDate={dayjs()}
        />
      </LocalizationProvider>
      <div className="mb-6">
        <label
          htmlFor="settings-timezone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Create time slot
        </label>
        <div className="flex">
          <Timer label="from time" defaultValue={currentTime} onTimeChange={handleFromTimeChange} />
          <Timer label="to time" onTimeChange={handleToTimeChange} />
        </div>
      </div>
      {timeSlots.length > 0 ? (
        <div>
          <h2>Existing Time Slots:</h2>
          <ul>
            {timeSlots.map((slot, index) => (
              <li key={index}>{`${slot.from} - ${slot.to}`}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No slots created for the selected date.</p>
      )}
      <button
        onClick={handleSaveSlots}
        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Save Slots
      </button>
    </div>
  );
};

export default DoctorSlotBooking;
