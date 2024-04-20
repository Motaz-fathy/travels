import React, { useEffect, useState } from "react";
import { Bus_search_form } from "./Bus_search_form/Bus_search_form";

export const Navigation_search = () => {
  const [lable, set_lable] = useState("bus");

  return (
    <div className="w-2/3 flex flex-col items-center bg-white p-2 rounded-xl absolute top-1/3 mx-auto left-0 right-0">
      {/* nav search  */}
      <ul className="w-full flex justify-between items-center gap-2 ">
        <li
          className={`w-1/4  flex justify-center items-center rounded-2xl  transform duration-200 ease-in-out cursor-pointer px-4 py-2  
          ${lable ===
          "bus"
            ? "bg-gray-800 text-white"
            : "bg-gray-200"}`}
          onClick={() => set_lable("bus")}
        >
          bus
        </li>
        <li
          className={`w-1/4  flex justify-center items-center rounded-2xl  transform duration-200 ease-in-out cursor-pointer px-4 py-2  
          ${lable ===
          "flight"
            ? "bg-gray-800 text-white"
            : "bg-gray-200"}`}
          onClick={() => set_lable("flight")}
        >
          flight
        </li>
        <li
          className={`w-1/4  flex justify-center items-center rounded-2xl  transform duration-200 ease-in-out cursor-pointer px-4 py-2  
          ${lable ===
          "maritime"
            ? "bg-gray-800 text-white"
            : "bg-gray-200"}`}
          onClick={() => set_lable("maritime")}
        >
          maritime
        </li>
        <li
          className={`w-1/4  flex justify-center items-center rounded-2xl  transform duration-200 ease-in-out cursor-pointer px-4 py-2  
          ${lable ===
          "car"
            ? "bg-gray-800 text-white"
            : "bg-gray-200"}`}
          onClick={() => set_lable("car")}
        >
          car
        </li>
      </ul>

      {/*  search form   */}
      {lable === "bus" && <Bus_search_form />}
      {lable === "flight" && <div>flight form </div>}
      {lable === "maritime" && <div>maritime form </div>}
      {lable === "car" && <div>car form </div>}
    </div>
  );
};
