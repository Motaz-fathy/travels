import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StoreSearchDataAction, search_bus_trip } from "../../../redux/actions/bus_travel_actions/bus_travel_actions";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';

export const NavigationSearchRound = ({
  onSelect_from,
  onSelect_to,
  startDate,
  endDate
}) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [disable, setDisable] = useState(true);
  const [searchAttempted, setSearchAttempted] = useState(false); // New state to track search attempts
  const { data, loading } = useSelector(state => state.busSearch);

  useEffect(() => {
    if (onSelect_from === null || onSelect_to === null || !startDate || !endDate) {

      setDisable(true);
    } else {
      const searchData = {
        city_from : onSelect_from ,
        city_to : onSelect_to ,
        startDate : startDate ,
        endDate : endDate
      }
      dispatch(StoreSearchDataAction(searchData));
      setDisable(false);
    }
  }, [onSelect_from, onSelect_to, startDate, endDate, dispatch]);

  const navigation = async (e) => {
    e.preventDefault();
    if(onSelect_from === onSelect_to){
      toast.warning("sorry you search between same city .");
    }
     else if(startDate >= endDate) {
      toast.warning("sorry , your start date large than or equal end date  .");
     }
    else {
      if (!disable) {
        if(startDate <= endDate){
          await dispatch(search_bus_trip(onSelect_from, onSelect_to, startDate));
          await 
          setSearchAttempted(true); // Set searchAttempted to true after a search is made
        }else{
          toast.warning("sorry start date hight or equal end date ");
        }
        
      } else {
        toast.error("Please fill in all required fields.");
      }
    }
  };

  useEffect(() => {
    if (searchAttempted) { // Only show toast messages if a search has been attempted
      if (data && data.length > 0) {
        nav("busTrips");
        toast.success("Search success! Please wait...");
      } else if (!loading) {
        toast.dark("No trips found for the selected cities.");
      }
    }
  }, [data, loading, searchAttempted, nav]);

  return (
    <button
      onClick={navigation}
      className={`p-2 w-10 h-10 -z-10 rounded-full bg-gradient-to-tr cursor-pointer ${disable === false ? "bg-gray-800" : "bg-gray-500"}
       text-white flex justify-center items-center max-md:w-full`}
    >
      <span className="hidden max-md:flex max-sm:flex mx-3"> Search </span>
      {loading ? <FaSpinner className="animate-spin w-5 h-5" /> : 
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
      }
    </button>
  );
};
