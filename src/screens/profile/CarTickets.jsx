import React from "react";
import { FaSpinner } from "react-icons/fa";
import { CarIcon } from "../../sheard/CarIcon";

export const CarTickets = ({ carTicket, carLoading }) => {

  return (
    <div className="flex flex-col items-start gap-4 ">
     {carLoading ? <div className="text-4xl w-full flex items-center justify-center py-20"> <FaSpinner /></div> : 
     <>
     <h1 className="text-2xl font-bold mb-4">
     {carTicket.length} private ticket
     </h1>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
     {carTicket ? 
      carTicket.map((ticket , index ) => {
         return <div>
             {/* {ticket.trips.map((item , index ) => {
                 return  <div className="w-full flex flex-col items-start gap-2"  key={index}>
                 <div className="w-full h-auto flex justify-between  items-center gap-2 text-xs" >
                   <span className="">
                     {item.from_address.name === null
                       ? "data error "
                       : item.to_address.name}{" "}
                   </span>
                   <CarIcon />
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
             })} */}
         </div>
      })
      : <span>sorry you not reservation private trip yet . </span>}
     </div>
     </>
     }
    </div>
  );
};


