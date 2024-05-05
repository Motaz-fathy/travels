import React from "react";

export const YourTrips = () => {
  const TripCard = () => {
    return (
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Card */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => {
            return (
              <div className="bg-white p-4 w-50 h-80 rounded-xl shadow-md">
                <h2 className="text-lg font-bold">Card 1</h2>
                <p>This is the content of card 1.</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <div className="h-fit py-12 px-12 flex flex-col items-center gap-4  bg-gray-900 rounded-[80px] max-sm:mt-16 max-sm:px-4  mb-5">
      <span className="text-4xl font-bold text-gray-200 pt-8">
        We’re with you every step
      </span>
      <span className="w-1/3 max-sm:w-2/3 bg-yellow-400 h-2 mx-auto -rotate-2 mb-5 rounded-full"></span>
      <TripCard />
    </div>
  );
};
