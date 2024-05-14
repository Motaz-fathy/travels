import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer";
import { useSelector } from "react-redux";

export const ReservationTicket = () => {
  const { reservationTicket } = useSelector(state => state.CreateTicketReducer);
  const trips = reservationTicket.trips;

  // render trips
  const RenderTicket = data => {
    return (
      <div>
        {data.length === 0 ? <div className="flex flex-col items-center gap-2 bg-gray-50 h-96 shadow-2xl  Clip rounded-md w-2/3 max-md:w-full " >
          

          </div> : <div>
          
              <div className="flex flex-col items-center gap-2 bg-gray-50 h-96 shadow-2xl  Clip rounded-md w-2/3 max-md:w-full " >

              </div>
            </div>
            }
      </div>
    );
  };
  return (
    <div className="w-full flex flex-col items-center bg-gray-200">
      {/* navbar  */}
      <Navbar />
      {/* container of ticket  */}
      <div className="h-auto w-full flex justify-center items-center gap-4 my-12 px-10 max-md:px-4">
        {RenderTicket(trips)}
      </div>
      {/* footer  */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};
