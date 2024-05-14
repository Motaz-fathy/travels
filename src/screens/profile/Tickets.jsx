import React from "react";
import { BusIcon } from "../../sheard/BusIcon";
import Slider from "../../sheard/Slider";
export const Tickets = ({ tickets }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {tickets.length} tickets{" "}
      </h1>
    <div className="w-4/5 max-md:w-full flex justify-start items-center">
      <div className="flex justify-start items-center gap-4 max-md:hidden">
      <button className="w-24 flex justify-center items-center h-10 rounded-xl p-4 bg-gray-600 text-gray-200 ">all</button>
        <button className="w-24 flex justify-center items-center h-10 rounded-xl p-4 bg-blue-600 text-gray-200 ">appending</button>
        <button className="w-24 flex justify-center items-center h-10 rounded-xl p-4 bg-red-600 text-gray-200 ">cancel</button>
        <button className="w-24 flex justify-center items-center h-10 rounded-xl p-4 bg-green-600 text-gray-200 ">booking</button>
      </div>
       <div className="hidden max-md:flex w-full">
       <Slider>
        <button className="px-16  py-2 rounded-xl bg-gray-600 text-gray-200 ">all</button>
        <button className="px-16  py-2 rounded-xl bg-blue-600 text-gray-200 ">appending</button>
        <button className="px-16  py-2 rounded-xl bg-red-600 text-gray-200 ">cancel</button>
        <button className="px-16  py-2 rounded-xl bg-green-600 text-gray-200 ">booking</button>
      </Slider>
       </div>
    </div>
      <br />
      {tickets.length > 0
          ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tickets.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white flex flex-col  items-center Clip gap-4 p-4 w-50 h-auto rounded-xl shadow-md hover:scale-110 max-md:hover:scale-105 transform duration-200 cursor-pointer "
                  >
                    <div className="w-full h-20 flex justify-between items-center gap-4">
                      <span className="">cairo</span>
                      <span>------ &gt; </span>
                      <BusIcon />
                      <span>------ &gt; </span>
                      <span>Alx</span>
                    </div>
                    <div className="w-full h-14 flex justify-between items-center ">
                      <p>Today's Date:</p>
                      <button className="px-8 py-2 bg-gray-800 rounded-xl text-white">
                        {" "}search{" "}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          : <div>no ticket here !_!</div>}
    </div>
  );
};
