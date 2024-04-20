import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../utils/FormatDate";
export const Single_date_picker = ({startDate , setStartDate}) => {

  const clearDate = () => {
    setStartDate(null);
  };

  return (
    <div>
      <div className={`relative w-full oneway`}>
        <div className="flex items-center px-4 py-2 bg-white border border-gray-400 rounded shadow leading-tight ">
          <DatePicker
            selected={startDate}
            onChange={date => {
              setStartDate(formatDate(date))
            }}
            dateFormat="dd-MM-yyyy"
            placeholderText="Select a start date"
            className="w-full  focus:outline-none cursor-pointer text-sm"
          />
          {startDate &&
            <span
              className=" text-red-500 cursor-pointer  bg-white"
              onClick={clearDate}
            >
              x
            </span>}
        </div>
      </div>
    </div>
  );
};

export const Rang_date_picker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div>
      <div className={`relative w-full twoway`}>
        <div className="flex justify-between items-center px-2 py-2 bg-white border border-gray-400 rounded shadow leading-tight ">
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a start date"
            className="w-full focus:outline-none cursor-pointer text-sm mr-4"
          />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select an end date"
            className="w-full focus:outline-none cursor-pointer text-sm"
          />
          {startDate &&
            <span
              className=" text-red-500 cursor-pointer  bg-white"
              onClick={clearDates}
            >
              x
            </span>}
        </div>
      </div>
    </div>
  );
};
