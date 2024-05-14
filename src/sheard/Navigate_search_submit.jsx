import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { search_bus_trip } from "../redux/actions/bus_travel_actions/bus_travel_actions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Navigate_search_submit = ({
  onSelect_from,
  onSelect_to,
  startDate
}) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (onSelect_from === null || onSelect_to === null || !startDate) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [onSelect_from, onSelect_to, startDate]);

  const navigation = async (e) => {
    e.preventDefault();
    if (!disable) {
      await nav('busTrips');
      dispatch(search_bus_trip(onSelect_from, onSelect_to, startDate));
      toast.success("Search success! Please wait..." ,  {
        className: 'custom_message',
      });
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  return (
    <button
        onClick={navigation}
        className={`p-2 w-10 h-10 -z-10 rounded-full bg-gradient-to-tr  cursor-pointer  ${disable === false ? "bg-gray-800" : "bg-gray-500"}
         text-white  flex justify-center items-center max-md:w-full  `}
        
      >
        <span className="hidden max-md:flex max-sm:flex mx-3"> Search </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
  );
};
