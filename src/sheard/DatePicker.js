import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../utils/FormatDate";

export const SingleDatePicker = ({
  startDate,
  setStartDate,
  converter_trip
}) => {
  const clearDate = () => {
    setStartDate(null);
  };

  return (
    <div className={`max-md:w-full `}>
      <div className="relative w-full max-md:w-full">
        <div
          className={`flex items-center px-4 py-2 bg-white border border-gray-400 rounded shadow leading-tight ${converter_trip}`}
        >
          <DatePicker
            selected={startDate}
            onChange={date => {
              setStartDate(formatDate(date));
            }}
            dateFormat="dd-MM-yyyy"
            placeholderText="Select a start date"
            className="w-full focus:outline-none cursor-pointer text-sm max-md:w-96 "
            minDate={new Date()} // Set minDate to today
            popperPlacement="bottom-start" // Set calendar placement
          />
          {startDate &&
            <span
              className="text-red-500 cursor-pointer bg-white max-md:w-96"
              onClick={clearDate}
            >
              x
            </span>}
        </div>
      </div>
    </div>
  );
};

export const RangeDatePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div>
      <div className="relative w-full">
        <div className="flex justify-between items-center px-2 py-2 bg-white border border-gray-400 rounded shadow leading-tight">
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a start date"
            className="w-full focus:outline-none cursor-pointer text-sm mr-4"
            minDate={new Date()} // Set minDate to today
            popperPlacement="top-start" // Set calendar placement
          />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select an end date"
            className="w-full focus:outline-none cursor-pointer text-sm"
            minDate={startDate || new Date()} // Set minDate to startDate or today
            popperPlacement="top-start" // Set calendar placement
          />
          {startDate &&
            <span
              className="text-red-500 cursor-pointer bg-white"
              onClick={clearDates}
            >
              x
            </span>}
        </div>
      </div>
    </div>
  );
};
