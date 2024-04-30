import React from "react";

export const MobileStore = () => {
  return (
    <div className="w-full px-32 max-sm:px-8 flex justify-between items-center max-sm:flex-col py-10 max-sm:py-0 ">
      <div className="w-1/2 relative flex justify-center items-center max-sm:w-full max-md:w-full">

        <img
          src="./images/landing_page/Yellow2.png"
          alt="./images/landing_page/Yellow2.png"
          className=" w-[350px] max-sm:w-[170px] max-sm:-left-0 absolute -left-20 top-10 "
        />
        
        <img
          src="./images/landing_page/Yellow.png"
          alt="./images/landing_page/Yellow.png"
          className=" w-[300px] max-sm:w-[140px] "
        />
      
      </div>

      <div className="flex flex-col items-start gap-4 w-1/2 max-sm:w-full max-md:w-full max-sm:mt-20 ">
        <span className="text-4xl font-bold text-gray-800 ">
          The world in your pocket
        </span>
        <span className="text-lg font-bold text-gray-600">
          Access mobile-only deals, view your trip details on the go and search
          hundreds of travel sites with one tap.
        </span>
        <span className="text-xl font-bold text-gray-800 ">
          Get the Telefrik app
        </span>
        <div className=" flex justify-center items-start gap-4 ">
        <button className="w-52 h-14 rounded-md bg-gray-800 text-white">IOS</button>
        <button className="w-52 h-14 rounded-md bg-gray-800 text-white">Android</button>

        </div>
      </div>
    </div>
  );
};
