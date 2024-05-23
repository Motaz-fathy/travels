import React, { useEffect, useState } from "react";
import { Bus_search_form } from "./Bus_search_form/Bus_search_form";
import Slider from "../../sheard/Slider";
import { BusIcon } from "../../sheard/BusIcon";
import { FlightIcon } from "../../sheard/FlightIcon";
import { MariTimeIcon } from "../../sheard/MariTimeIcon";
import { CarIcon } from "../../sheard/CarIcon";
export const Navigation_search = () => {
  const [lable, set_lable] = useState("bus");

  return (
    <div className="w-2/3 max-sm:w-full   flex flex-col items-center shadow-xl bg-gray-500 bg-opacity-20 py-2 px-2 rounded-xl absolute top-1/3 max-md:top-30 mx-auto left-0 right-0 ">
      {/* nav search  */}

      <ul className="w-full flex justify-between items-center gap-2 max-md-hidden max-sm:hidden ">
        <li
          className={`w-1/4  flex justify-center items-center rounded-2xl gap-2  transform duration-200 ease-in-out cursor-pointer px-4 py-2  
          ${lable === "bus" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
          onClick={() => set_lable("bus")}
        >
          <BusIcon lable={lable} />
          <span>bus</span>
        </li>
        <li
          className={`w-1/4  flex justify-center items-center gap-2 rounded-2xl  transform duration-200 ease-in-out cursor-pointer px-4 py-2  
          ${lable === "flight" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
          onClick={() => set_lable("flight")}
        >
          <FlightIcon lable={lable} />
          <span>flight</span>
        </li>
        <li
          className={`w-1/4  flex justify-center items-center rounded-2xl gap-2 transform duration-200 ease-in-out cursor-pointer px-4 py-2  
          ${lable === "maritime" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
          onClick={() => set_lable("maritime")}
        >
          <MariTimeIcon lable={lable} />
          <span>maritime</span>
        </li>
        <li
          className={`w-1/4  flex justify-center items-center rounded-2xl gap-2  transform duration-200 ease-in-out cursor-pointer px-4 py-2  
          ${lable === "car" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
          onClick={() => set_lable("car")}
        >
          <CarIcon lable={lable} />
          <span>car</span>
        </li>
      </ul>

      <div className="hidden max-md-flex max-sm:flex w-full justify-between items-center ">
        <Slider>
          <div
            className={`w-auto gap-3  flex justify-center items-center rounded-2xl  transform duration-200 ease-in-out cursor-pointer px-16 py-2  
          ${lable === "bus" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
            onClick={() => set_lable("bus")}
          >
            <BusIcon lable={lable} />
            <span>bus</span>
          </div>
          <div
            className={`w-auto gap-3  flex justify-center items-center rounded-2xl  transform duration-200 ease-in-out cursor-pointer px-16 py-2  
          ${lable === "flight" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
            onClick={() => set_lable("flight")}
          >
            <FlightIcon lable={lable}/>
             <span>flight</span>
          </div>
          <div
            className={`w-auto gap-3  flex justify-center items-center rounded-2xl  transform duration-200 ease-in-out cursor-pointer px-16 py-2  
          ${lable === "maritime" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
            onClick={() => set_lable("maritime")}
          >
            <MariTimeIcon lable={lable} />
             <span>maritime</span>
          </div>
          <div
            className={`w-auto gap-3  flex justify-center items-center rounded-2xl  transform duration-200 ease-in-out cursor-pointer px-16 py-2  
          ${lable === "car" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
            onClick={() => set_lable("car")}
          >
            <CarIcon lable={lable} />
           <span>car</span>
          </div>
        </Slider>
      </div>

      {/*  search form   */}
      {lable === "bus" && <Bus_search_form />}
      {lable === "flight" && <div>flight form </div>}
      {lable === "maritime" && <div>maritime form </div>}
      {lable === "car" && <div>car form </div>}
    </div>
  );
};
