import React from "react";

export const YourTrips = () => {
  const TripCard = () => {
    return (
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white p-4 shadow-md">
            <h2 className="text-lg font-bold">Card 1</h2>
            <p>This is the content of card 1.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-4 shadow-md">
            <h2 className="text-lg font-bold">Card 2</h2>
            <p>This is the content of card 2.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-4 shadow-md">
            <h2 className="text-lg font-bold">Card 3</h2>
            <p>This is the content of card 3.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-4 shadow-md">
            <h2 className="text-lg font-bold">Card 4</h2>
            <p>This is the content of card 4.</p>
          </div>

          {/* Add more cards as needed */}
          {/* Card 1 */}
          <div className="bg-white p-4 shadow-md">
            <h2 className="text-lg font-bold">Card 1</h2>
            <p>This is the content of card 1.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-4 shadow-md">
            <h2 className="text-lg font-bold">Card 2</h2>
            <p>This is the content of card 2.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-4 shadow-md">
            <h2 className="text-lg font-bold">Card 3</h2>
            <p>This is the content of card 3.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-4 shadow-md">
            <h2 className="text-lg font-bold">Card 4</h2>
            <p>This is the content of card 4.</p>
          </div>

          {/* Add more cards as needed */}
        </div>
      </div>
    );
  };
  return (
    <div className="h-fit py-12 px-24 flex flex-col items-center gap-4  bg-gray-900 max-sm:mt-16 max-sm:px-4  mb-5">
      <span className="text-4xl font-bold text-gray-200 pt-8">
        We’re with you every step
      </span>
      <TripCard />
      <img
        src="./images/landing_page/wordImg.png"
        alt="./images/landing_page/wordImg.png"
        className="  translate-y-16  "
      />
    </div>
  );
};
