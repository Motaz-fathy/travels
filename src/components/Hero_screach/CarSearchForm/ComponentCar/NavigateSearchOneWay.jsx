import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { SearchCarAction } from "../../../../redux/actions/CarActions/CarActions";
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';

export const NavigateSearchOneWay = ({
    onSelectFrom , 
    onSelectTo ,
    startDate
}) => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [disable, setDisable] = useState(true);
    const [searchAttempted, setSearchAttempted] = useState(false); // New state to track search attempts
    const { loadingSearchCar , dataSearchCar , errorSearchCar } = useSelector(state => state.SearchCarReducer);


    useEffect(() => {
        if (onSelectFrom === null || onSelectTo === null || !startDate) {
          setDisable(true);
        } else {
          setDisable(false);
        }
      }, [onSelectFrom, onSelectTo, startDate]);
    
      const navigationCarTrip = async (e) => {
        e.preventDefault();
        if(onSelectFrom === onSelectTo){
          toast.warning("sorry you search between same city .");
          
         }else {
          if (!disable) {
            await dispatch(SearchCarAction(onSelectFrom, onSelectTo, startDate));
           setSearchAttempted(true); // Set searchAttempted to true after a search is made
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

  return (
    <button
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
  )
}
