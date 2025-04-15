import React from "react";
import { BusIcon } from "../../sheard/BusIcon";
import Slider from "../../sheard/Slider";
import { FaSpinner } from 'react-icons/fa';

export const BusTickets = ({ busTicket  , loading}) => {
 
  return (
    <>{loading ? <div className="text-4xl w-full flex items-center justify-center py-20"><FaSpinner /></div>  : 
    <div>
    <h1 className="text-2xl font-bold mb-4">
      {busTicket.length} bus ticket{" "}
    </h1>
    <div className="w-4/5 max-md:w-full flex justify-start items-center">
      <div className="flex justify-start items-center gap-4 max-md:hidden">
        <button className="w-24 flex justify-center items-center h-10 rounded-xl p-4 bg-gray-600 text-gray-200 ">
          all
        </button>
        <button className="w-24 flex justify-center items-center h-10 rounded-xl p-4 bg-blue-600 text-gray-200 ">
          appending
        </button>
        <button className="w-24 flex justify-center items-center h-10 rounded-xl p-4 bg-red-600 text-gray-200 ">
          cancel
        </button>
        <button className="w-24 flex justify-center items-center h-10 rounded-xl p-4 bg-green-600 text-gray-200 ">
          booking
        </button>
      </div>
      <div className="hidden max-md:flex w-full">
        <Slider>
          <button className="px-16  py-2 rounded-xl bg-gray-600 text-gray-200 ">
            all
          </button>
          <button className="px-16  py-2 rounded-xl bg-blue-600 text-gray-200 ">
            appending
          </button>
          <button className="px-16  py-2 rounded-xl bg-red-600 text-gray-200 ">
            cancel
          </button>
          <button className="px-16  py-2 rounded-xl bg-green-600 text-gray-200 ">
            booking
          </button>
        </Slider>
      </div>
    </div>
    <br />
    {busTicket.length > 0
      ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {busTicket.map((item, index) => {
            return (
              <div
                key={index}
                className=" flex flex-col h-64 bg-gray-100  items-center  gap-2 shadow-xl p-4  overflow-y-scroll scrollbar-hide rounded-xl  hover:bg-gray-200  transition-all duration-300 cursor-pointer "
              >
                {item.trips.map((item, index) => {
                  return (
                    <div className="w-full flex flex-col items-start gap-2"  key={index}>
                      <div className="w-full h-auto flex justify-between  items-center gap-2 text-xs" >
                        <span className="">
                          {item.station_from.name === null
                            ? "data error "
                            : item.station_from.name}{" "}
                        </span>
                        <BusIcon />
                        <span>
                          {item.station_to.name}
                        </span>
                      </div>
                      <div className="w-full flex justify-start items-center gap-2 ">
                        <img src={item.company_data.avatar} alt={item.company_data.avatar} className="w-10 h-10 rounded-full " />
                      </div>
                      <div className="text-gray-600 text-sm">{item.date_time}</div>
                      <div className="flex justify-start items-center gap-2 ">
                      seats  {item.tickets.map((item , index) => {
                          return (<span key={index}> {item.seat_number} </span>)
                        })}
                      </div>
                    </div>
                  );
                })}
                <div className="w-full h-14 flex justify-between items-center ">
                  <p>{item.total}</p>
                  <button className="px-8 py-2 bg-gray-900 hover:bg-gray-800 transition-all duration-300 rounded-xl text-white">
                    {" "}view ticket {" "}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      : <div> sorry you not reservation ticket  </div>}
  </div>
    }</>

  );
};
