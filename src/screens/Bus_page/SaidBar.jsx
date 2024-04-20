import React, { useState } from "react";
import { FilterTrips } from "../../utils/filterTripsByArrivalTime";

export const SaidBar = ({setModifiyTrips , allTrips , isOpen}) => {
  const [showSidebar, setShowSideBar] = useState(false);
  return (

      <div className="fixed">
        <div className="w-full justify-end items-end hidden max-sm:flex cursor-pointer">
          <span className="text-md font-extrabold">x</span>
        </div>
        {/* Logo */}
        <div className="text-center ">
          {/* <img src="/path/to/logo.png" alt="Logo" className="w-8 h-8" /> */}
          <div>Logo</div>
        </div>
        {/* Buttons */}
        <div className=" m-auto flex flex-col items-start  ">
          <FilterTrips
          setModifiyTrips={setModifiyTrips}
          trips={allTrips}
          isOpen={isOpen}
          />
        </div>
      </div>

  );
};
