import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Timer from "../Timer/Timer";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/constants/Constants";
import { DateCalendar } from "@mui/x-date-pickers";
import { TrashIcon } from "@heroicons/react/24/solid";
import moment from "moment";

const DoctorSlotBooking = ({ docid }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [timeSlots, setTimeSlots] = useState([]);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const currentTime = dayjs(new Date());

  useEffect(() => {
    // Fetch existing time slots for the selected date and update state
    fetchAvailableSlots()

  }, [selectedDate, docid]);

  // function to fetch the available slots

  const fetchAvailableSlots = () => {
    axios
    .get(
      baseUrl +
        `appointment/doctors/${docid}/slots?date=${selectedDate.format(
          "YYYY-MM-DD"
        )}`
    )
    .then((response) => {
      setTimeSlots(response.data.available_slots || []);
    })
    .catch((error) => {
      console.error("Error fetching existing time slots:", error);
    });

  };
  // this is used for to convert the time to 12 hour format 

  const convertTo12HourFormat = (timeString) => {
    if (!timeString) {
      return "";
    }
    const [hours, minutes] = timeString.split(":");
    let period = "am";
    let hoursIn24HourFormat = parseInt(hours, 10);

    if (hoursIn24HourFormat >= 12) {
      period = "pm";
      if (hoursIn24HourFormat > 12) {
        hoursIn24HourFormat -= 12;
      }
    } else if (hoursIn24HourFormat === 0) {
      hoursIn24HourFormat = 12;
    }

    return `${hoursIn24HourFormat}:${minutes} ${period}`;
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

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
      console.log("Before formatting:", fromTime, toTime);

      const fromTimeFormatted = moment(fromTime.$d).format("HH:mm:ss");
      const toTimeFormatted = moment(toTime.$d).format("HH:mm:ss");

      console.log("After formatting:", fromTimeFormatted, toTimeFormatted);

      const newSlot = {
        from_time: fromTimeFormatted,
        to_time: toTimeFormatted,
      };
      const updatedSlots = [newSlot];

      axios
        .post(baseUrl + `appointment/doctors/${docid}/update_slots/`, {
          date: selectedDate.format("YYYY-MM-DD"),
          slots: updatedSlots,
        })
        .then((response) => {
          fetchAvailableSlots()
        })
        .catch((error) => {
          console.error("Error updating time slots:", error);
        });

      // setFromTime(null);
      // setToTime(null);
    } else {
      toast.warning("Please select from and to time");
    }
  };

  const handleDeleteSlot = (index) => {
    const updatedSlots = [...timeSlots];
    updatedSlots.splice(index, 1);

    axios
      .post(baseUrl + `appointment/doctors/${docid}/updateSlots`, {
        date: selectedDate.format("YYYY-MM-DD"),
        slots: updatedSlots,
      })
      .then((response) => {
        setTimeSlots(updatedSlots);
        setSelectedTimeSlot(null); // Clear selected slot after deletion
      })
      .catch((error) => {
        console.error("Error deleting time slot:", error);
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
        <div className="flex pb-4">
          <Timer
            label="from time"
            defaultValue={currentTime}
            onTimeChange={handleFromTimeChange}
          />
          <Timer label="to time" onTimeChange={handleToTimeChange} />
        </div>
        <button
          onClick={handleSaveSlots}
          className=" text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Save Slots
        </button>
      </div>
      <h2 className="font-bold p-2 mb-2 border-2 border-black">
        Created Time Slots for - {selectedDate.format("YYYY-MM-DD")}
      </h2>
      {timeSlots.length > 0 ? (
        <div className="pb-6">
          <ul>
            {timeSlots.map((timeSlot, index) => (
              <li
                key={index}
                onClick={() => handleTimeSlotSelect(timeSlot)}
                style={{
                  cursor: "pointer",
                  fontWeight: selectedTimeSlot === timeSlot ? "bold" : "normal",
                  border: "1px solid #ddd",
                  padding: "8px",
                  marginBottom: "4px",
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between", // Align items horizontally
                }}
              >
                {`${convertTo12HourFormat(
                  timeSlot.from
                )} - ${convertTo12HourFormat(timeSlot.to)}`}
                <TrashIcon
                  className="h-5 w-5 text-red-500 cursor-pointer "
                  onClick={() => handleDeleteSlot(index)}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="font-medium text-red-400 pt-2">
          No slots created for the selected date.
        </p>
      )}
    </div>
  );
};

export default DoctorSlotBooking;
