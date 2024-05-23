import React from "react";
import { BusIcon } from "../../sheard/BusIcon";
export const YourTrips = () => {
  const TripCard = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB");
    return (
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Card */}
          {[1, 2, 3, 4].map(() => {
            return (
              <div className="bg-white flex flex-col  items-center Clip gap-4 p-4 w-50 h-auto rounded-xl shadow-md hover:scale-110 max-md:hover:scale-105 transform duration-200 cursor-pointer ">
                <div className="w-full h-20 flex justify-between items-center gap-4">
                  <span className="">cairo</span>
                  <span>------ &gt; </span>
                  <BusIcon />
                  <span>------ &gt; </span>
                  <span>Alx</span>
                </div>
                 <div className="w-full h-14 flex justify-between items-center ">
                 <p>
                  Today's Date: {formattedDate}
                 </p>
                 <button className="px-8 py-2 bg-gray-800 rounded-xl text-white"> search </button>
                 </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <div className="h-fit py-12 px-12 flex flex-col items-center gap-4 Clip bg-gray-900 rounded-[100px] max-sm:mt-16 max-sm:px-4  mb-5">
      <span className="text-4xl font-bold text-gray-200 pt-8">
        We’re with you every step
      </span>
      <span className="w-1/3 max-sm:w-2/3 bg-yellow-400 h-2 mx-auto -rotate-2 mb-5 rounded-full" />
      <TripCard />
    </div>
  );
};
