import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer";
import { useSelector } from "react-redux";
import { CarHeader } from "./CarHeader";
import { CarIcon } from "../../sheard/CarIcon";
import { ToastContainer } from "react-toastify";
import { FaSpinner } from 'react-icons/fa';

export const PaymentCar = () => {
  const { carTrip } = useSelector(state => state.singleCarReducer);

  const { CarTicket, loading, error } = useSelector(
    state => state.createTicketCarReducer
  );

  const RenderOneWay = item => {
    if(!item) return <div className="w-full min-h-screen flex justify-center items-center "><span>sorry , you not reservation car ticket now .</span></div>
    return (
      <div className=" w-full flex flex-col items-center gap-6 ">
        {loading ? <FaSpinner /> :  
        item?.map((trip, index) => {
          return (
            <div
              key={index}
              className="w-full px-8 shadow-xl mx-auto bg-white rounded-xl py-4 flex flex-col items-center gap-4 "
            >
              <div className="w-full flex justify-between items-center ">
                <img
                  src={trip.company_data.logo}
                  alt={trip.company_data.logo}
                  className="w-10 h-10 rounded-full shadow-xl "
                />
                <span className="text-gray-800 ">
                  {trip.date_time}
                </span>
              </div>

              <div className="w-full flex justify-between items-center">
                <div className="flex justify-start items-center gap-2 ">
                  <div className="border-gray-800 border-l-2 w-2 h-20 border-dashed" />
                  <div className="flex flex-col items-start gap-2 ">
                    <span>
                      {trip.from_address.name}
                    </span>
                    <CarIcon />
                    <span>
                      {trip.to_address.name}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="seat " />
                  <span className="text-gray-600">
                    {trip.bus.seats_number} seats
                  </span>
                </div>
              </div>

              <div className="w-full  flex justify-between items-center ">
                <span>
                  {trip.bus.name} model {trip.bus.model}
                </span>
                <img
                  src={trip.bus.featured_image}
                  alt={trip.bus.featured_image}
                  className="w-20 h-10 rounded-md shadow-xl "
                />
              </div>

              <span className="h-[2px] bg-gray-200 w-full rounded-full " />

              <div className="w-full flex justify-between items-center ">
                <span className="text-gray-500 ">
                  Free cancellation up to 3 hours before your pick-up
                </span>
                <span className="text-gray-800 ">
                  {trip.price} EGP{" "}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-200 ">
      <Navbar />
      <CarHeader trip={carTrip} />
      <div className="container my-10 ">
        {RenderOneWay(CarTicket.trips)}
      </div>
      <div className="w-full flex justify-center items-center gap-4 max-md:flex-col my-10 max-md:px-4">
        <span className="w-1/5 flex flex-col items-center max-md:w-full px-4 py-1 text-center rounded-lg bg-gray-400 ">
          <span>discount</span> <span>{CarTicket.discount}</span>
        </span>
        <span className="w-1/5 flex flex-col items-center max-md:w-full px-4 py-1 text-center rounded-lg bg-gray-400 ">
          <span>payment fees value</span> <span>{CarTicket.payment_fees_value}</span>
        </span>
        <span className="w-1/5 flex flex-col items-center max-md:w-full px-4 py-1 text-center rounded-lg bg-yellow-400 ">
          <span>total</span> <span>{CarTicket.total}</span>
        </span>
        <span className="w-1/5 flex flex-col items-center max-md:w-full px-4 py-3 text-center cursor-pointer rounded-lg bg-gray-900 hover:bg-gray-800 transition-all duration-300 text-gray-200  ">
          pay
        </span>
      </div>
      <div className="" />
      <div className="w-full">
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};
