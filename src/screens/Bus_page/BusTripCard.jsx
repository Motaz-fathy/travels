import React from "react";
import {SingleBusTrip} from '../../redux/actions/bus_travel_actions/bus_travel_actions'
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
export const BusTripCard = ({ trip }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { company_data, date, time, cities_from, cities_to , stations_from , stations_to , company , bus , price_start_with } = trip;

  const handleSingleTrip = async (item) => {
   await dispatch(SingleBusTrip(item))
   navigate(`${item.id}`)
  }

  return (
    <div className="bg-white bg-opacity-30 rounded-lg shadow-lg p-6 mb-4 backdrop-filter backdrop-blur-lg ">
        <div className="flex flex-col items-center gap-2 w-full ">
          <div className="flex justify-between items-center w-full">
            <img src={company_data.avatar} alt={company_data.name} height={40} width={40} />
             <span>{time}</span>
          </div>

          <div className="flex justify-between items-center w-full">
            <div className="flex justify-start items-center gap-2 ">
              <div className="border-gray-400 border-l-2 w-2 h-40"></div>
              <div className="flex flex-col items-start gap-2 ">
              <span>{cities_from[0].name} ({stations_from[0].name}) </span>
              <span>{stations_from[0].arrival_at}</span>
              <span>{cities_to[0].name} ({stations_to[0].name}) </span>
              <span>{stations_to[0].arrival_at}</span>
              </div>

            </div>
            <img src={company_data.bus_image} alt={company_data.name}  width={100} height={50}/>
          </div>
           
           <div  className="flex justify-between items-center w-full">
            <span className="px-2 py-1 rounded-2xl bg-gray-600 text-white">{bus.category}</span>
            <div className="flex justify-center items-center gap-2 ">
              <div className="flex flex-col items-end gap-2 ">
                <span>{price_start_with} EL</span>
                <span className="text-[10px]">price per person </span>
              </div>
               <button onClick={ () => handleSingleTrip(trip) } className="w-20 h-10 bg-gray-900 text-white rounded-lg  px-2"> select </button>
            </div>
           </div>

        </div>
      </div>
  );
};
