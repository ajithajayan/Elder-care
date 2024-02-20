import React, { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Timer from "../Timer/Timer";

const DoctorSlotBooking = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [timeSlots, setTimeSlots] = useState([]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setTimeSlots([]); // Reset time slots when the date changes
  };

  const handleTimeChange = (fromTime, toTime) => {
    const newSlot = { from: fromTime, to: toTime };
    setTimeSlots([...timeSlots, newSlot]);
  };

  const handleSaveSlots = () => {
    // Make an API call to save time slots to the database
    console.log("Selected date:", selectedDate);
    console.log("Time slots:", timeSlots);
    axios
      .post("/api/saveSlots", { date: selectedDate, slots: timeSlots })
      .then((response) => {
        console.log("Time slots saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving time slots:", error);
      });
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
          <Timer label="from time" onTimeChange={handleTimeChange} />
          <Timer label="to time" onTimeChange={handleTimeChange} />
        </div>
      </div>

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
