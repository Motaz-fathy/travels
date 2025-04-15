import React, { useEffect, useState } from "react";

import { toast } from 'react-toastify';

export const NavigateSearchOneWay = ({
    onSelectFrom , 
    onSelectTo ,
    startDate
}) => {
    const [disable, setDisable] = useState(true);


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
           toast.dark("Plane flights are not ready now")
         } else {
           toast.error("Please fill in all required fields.");
         }
         }
       
      };



  return (
    <button
    onClick={navigationCarTrip}
    className={`p-2 w-10 h-10 -z-10 rounded-full bg-gradient-to-tr cursor-pointer ${disable === false ? "bg-gray-800" : "bg-gray-500"}
     text-white flex justify-center items-center max-md:w-full`}
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
  )
}
