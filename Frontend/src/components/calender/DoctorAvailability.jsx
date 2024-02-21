import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { baseUrl } from "../../utils/constants/Constants";
import Modal from "react-modal";

const DoctorAvailability = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAvailableTimeSlots(selectedDate.format("YYYY-MM-DD"));
  }, [selectedDate]);

  const fetchAvailableTimeSlots = async (date) => {
    try {
      const response = await axios.get(
        baseUrl + `appointment/doctors/D5001/slots?date=${date}`
      );
      setAvailableTimeSlots(response.data.available_slots || []); // Adjust property name based on your API response
    } catch (error) {
      console.error("Error fetching available time slots:", error);
      setAvailableTimeSlots([]);
    }
  };

  // Function to convert the time to 12hrs format
  const convertTo12HourFormat = (timeString) => {
  if (!timeString) {
    return ''; // or any default value you want to handle the case when timeString is undefined
  }

  const [hours, minutes] = timeString.split(':');
  let period = 'am';

  let hoursIn24HourFormat = parseInt(hours, 10);

  if (hoursIn24HourFormat >= 12) {
    period = 'pm';
    if (hoursIn24HourFormat > 12) {
      hoursIn24HourFormat -= 12;
    }
  } else if (hoursIn24HourFormat === 0) {
    hoursIn24HourFormat = 12;
  }

  return `${hoursIn24HourFormat}:${minutes} ${period}`;
};
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setSelectedTimeSlot(null); // Reset selected time slot when the date changes
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setIsModalOpen(true);
  };

  const handleBooking = async () => {
    // Implement your booking logic here
    console.log("Booking:", selectedTimeSlot);

    // Send appointment request to the backend
    try {
      const response = await axios.post(baseUrl + "appointment/book", {
        doctorId: "D5001",
        date: selectedDate.format("YYYY-MM-DD"),
        timeSlotId: selectedTimeSlot.id, // Make sure to include a unique identifier for the time slot
      });

      // Handle the response as needed (e.g., show success message)
      console.log("Appointment booked successfully:", response.data);

      // Close the modal after successful booking
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error booking appointment:", error);
      // Handle errors (e.g., show error message)
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

      <h2 className="font-bold p-2 mb-2 border-2 border-black">Available Time Slots for - {selectedDate.format("YYYY-MM-DD")}</h2>

      {availableTimeSlots && availableTimeSlots.length === 0 ? (
        <p className="font-medium text-red-400 pt-2">No slots available for the selected date.</p>
      ) : (
        <ul>
          {availableTimeSlots.map((timeSlot, index) => (
            <li
              key={index}
              onClick={() => handleTimeSlotSelect(timeSlot)}
              style={{
                cursor: "pointer",
                fontWeight: selectedTimeSlot === timeSlot ? "bold" : "normal",
                border: "1px solid #ddd",
                padding: "8px",
                marginBottom: "4px",
                
              }}
            >
              {`${convertTo12HourFormat(timeSlot.from)} - ${convertTo12HourFormat(timeSlot.to)}`}
            </li>
          ))}
        </ul>
      )}

      {selectedTimeSlot && (
        <>
          <button className="bg-slate-950 text-slate-400 border border-slate-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
  <span className="bg-slate-400 shadow-slate-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
  Book Appointment for {convertTo12HourFormat(selectedTimeSlot.from)} - {convertTo12HourFormat(selectedTimeSlot.to)}
</button>


        </>
      )}

      {/* Modal for Appointment Confirmation */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Appointment Confirmation"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Confirm Appointment</h2>
        <p>
          You are about to book an appointment for{" "}
          {convertTo12HourFormat(selectedTimeSlot?.from)} -{" "}
          {convertTo12HourFormat(selectedTimeSlot?.to)} on{" "}
          {selectedDate.format("YYYY-MM-DD")}.
        </p>
        <button onClick={handleBooking}>Confirm Appointment</button>
        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
};

export default DoctorAvailability;
