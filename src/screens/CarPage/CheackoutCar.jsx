import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer";
import { useSelector } from "react-redux";
import { CarHeader } from "./CarHeader";
import { CarIcon } from "../../sheard/CarIcon";
import { CarAddresses } from "./CarAddresses";
import { ToastContainer  } from "react-toastify";

export const CheackoutCar = () => {

  
  const { carTrip } = useSelector(
    state => state.singleCarReducer
  );

  const RenderOneWay = item => {
    return (
      <div className="w-full px-8 shadow-xl mx-auto bg-white rounded-xl py-4 flex flex-col items-center gap-4 ">

        <div className="w-full flex justify-between items-center ">
          <img
            src={item.company_logo}
            alt={item.company_logo}
            className="w-10 h-10 rounded-full shadow-xl "
          />
          <span className="text-gray-800 ">
            {item.date}
          </span>
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="flex justify-start items-center gap-2 ">
            <div className="border-gray-800 border-l-2 w-2 h-20 border-dashed" />
            <div className="flex flex-col items-start gap-2 ">
              <span>
                {item.from_location.name}
              </span>
              <CarIcon />
              <span>
                {item.to_location.name}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="seat " />
            <span className="text-gray-600">
              {item.bus.seats_number} seats
            </span>
          </div>
        </div>

        <div className="w-full  flex justify-between items-center ">
          <span>
            {item.bus.name} model {item.bus.model}
          </span>
          <img
            src={item.bus.featured_image}
            alt={item.bus.featured_image}
            className="w-20 h-10 rounded-md shadow-xl "
          />
        </div>

        <span className="h-[2px] bg-gray-200 w-full rounded-full "></span>

        <div className="w-full flex justify-between items-center ">
            <span className="text-gray-500 ">Free cancellation up to 3 hours before your pick-up</span>
            <span className="text-gray-800 ">{item.price} EGP </span>
        </div>

      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-200 ">
      <Navbar />
       <CarHeader trip={carTrip} />
      <div className="container my-10 ">
        {RenderOneWay(carTrip)}
      </div>
      <div className="container bg-white shadow-xl w-full rounded-xl mb-10">
      <CarAddresses trip={carTrip}/>
      </div>
      <div className="w-full">
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};
