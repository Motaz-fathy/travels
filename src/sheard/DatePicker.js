import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../utils/FormatDate";
import { FaCalendarAlt } from 'react-icons/fa';
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
          className={`flex items-center gap-1  px-4 py-2 bg-gray-200 border border-gray-400 rounded shadow leading-tight ${converter_trip}`}
        >
      
          <DatePicker
            selected={startDate}
            onChange={date => {
              setStartDate(formatDate(date));
            }}
            dateFormat="dd-MM-yyyy"
            placeholderText="Select a start date"
            className="w-full focus:outline-none cursor-pointer text-sm max-md:w-[22.5rem] max-sm:w-[19.6rem] bg-gray-200"
            minDate={new Date()} // Set minDate to today
            popperPlacement="bottom-start" // Set calendar placement
          />
          {startDate &&
            <span
              className="text-red-500 cursor-pointer bg-transparent max-md:w-96"
              onClick={clearDate}
            >
              x
            </span>}
        </div>
      </div>
    </div>
  );
};

export const RangeDatePicker = ({
  startDate ,
  setStartDate ,
  endDate , 
  setEndDate,
  converter_trip 
}) => {

  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className={`max-md:w-full `} >
      <div className="relative w-full max-md:w-full">
        <div className={`flex items-center  bg-gray-200 border max-md:mx-auto border-gray-400 rounded shadow leading-tight ${converter_trip}`}>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(formatDate(date))}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a start date"
            className="w-full focus:outline-none cursor-pointer text-sm px-4 py-2 max-md:px-6 bg-gray-200"
            minDate={startDate || new  Date()} // Set minDate to today
            popperPlacement="top-start" // Set calendar placement
          />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(formatDate(date))}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select an end date"
            className="w-full focus:outline-none cursor-pointer text-sm px-4 py-2 max-md:px-6 bg-gray-200"
            minDate={endDate || new Date()} // Set minDate to startDate or today
            popperPlacement="top-start" // Set calendar placement
          />
          {startDate && endDate && 
            <span
              className="text-red-500 cursor-pointer bg-transparent mr-2"
              onClick={clearDates}
            >
              x
            </span>}
        </div>
      </div>
    </div>
  );
};
