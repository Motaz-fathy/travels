import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SearchCarAction } from "../../../../redux/actions/CarActions/CarActions";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { StoreSearchDataAction } from "../../../../redux/actions/bus_travel_actions/bus_travel_actions";

export const NavigateSearchRoundWay = ({
  onSelectFrom,
  onSelectTo,
  startDate,
  endDate
}) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [disable, setDisable] = useState(true);
  const [searchAttempted, setSearchAttempted] = useState(false); // New state to track search attempts
  const { loadingSearchCar, dataSearchCar, errorSearchCar } = useSelector(
    state => state.SearchCarReducer
  );

  useEffect(
    () => {
      if (onSelectFrom === null || onSelectTo === null || !startDate || !endDate) {    
        setDisable(true);
      } else {
        const searchData = {
            city_from : onSelectFrom ,
            city_to : onSelectTo ,
            startDate : startDate ,
            endDate : endDate
          }
          dispatch(StoreSearchDataAction(searchData));
         setDisable(false);
      }
    },
    [onSelectFrom, onSelectTo, startDate , endDate]
  );

   
  const navigationCarTrip = async (e) => {
    e.preventDefault();
    if(onSelectFrom === onSelectTo){
      toast.warning("sorry you search between same city .");
      
     } else if(startDate >= endDate){
        toast.warning("sorry , your start date large than or equal end date  .");
        return 
     }
     
     else { 
      if (!disable) {
        await dispatch(SearchCarAction(onSelectFrom, onSelectTo, startDate));
        setSearchAttempted(true); 
     } else {
       toast.error("Please fill in all required fields.");
     }
     }
   
  };

  useEffect(() => {
    if (searchAttempted) { // Only show toast messages if a search has been attempted
      if (dataSearchCar && dataSearchCar.length > 0) {
        nav('carTrip');
        toast.success("Search success! Please wait...");
      } else if (!loadingSearchCar) {
        toast.dark("No trips found for the selected cities.");
      }
    }
  }, [dataSearchCar, loadingSearchCar, searchAttempted, nav]);


  return   <button
    onClick={navigationCarTrip}
    className={`p-2 w-10 h-10 -z-10 rounded-full bg-gradient-to-tr cursor-pointer ${disable === false ? "bg-gray-800" : "bg-gray-500"}
     text-white flex justify-center items-center max-md:w-full`}
  >
    <span className="hidden max-md:flex max-sm:flex mx-3"> Search </span>
    {loadingSearchCar ? <FaSpinner className="animate-spin w-5 h-5" /> : 
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
};
