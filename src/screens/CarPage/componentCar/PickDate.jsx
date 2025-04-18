// PickDate.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export const PickDate = ({selectedTime ,handleTimeChange }) => {

  return (
    <DatePicker
        selected={selectedTime}
        onChange={handleTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15} // You can adjust the intervals (e.g., 15 minutes)
        timeCaption="Time"
        dateFormat="h:mm aa"
        className=" p-2 rounded-md focus:outline-none cursor-pointer w-full"
        placeholderText="Pickup time"
      />
  );
};


export const RangePickTime = ({ startTime, endTime, handleStartTimeChange, handleEndTimeChange }) => {
  return (
    <div className="flex flex-col space-y-4">
      <DatePicker
        selected={startTime}
        onChange={handleStartTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15} // You can adjust the intervals (e.g., 15 minutes)
        timeCaption="Start Time"
        dateFormat="h:mm aa"
        className="p-2 rounded-md focus:outline-none cursor-pointer w-full"
        placeholderText="Start Time"
      />
      <DatePicker
        selected={endTime}
        onChange={handleEndTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15} // You can adjust the intervals (e.g., 15 minutes)
        timeCaption="End Time"
        dateFormat="h:mm aa"
        className="p-2 rounded-md focus:outline-none cursor-pointer w-full"
        placeholderText="End Time"
      />
    </div>
  );
};
