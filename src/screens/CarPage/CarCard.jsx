import React from 'react'
import { useNavigate } from "react-router-dom";

import {CarIcon} from '../../sheard/CarIcon'
export const CarCard = ({item}) => {
    const navigate = useNavigate();
    const handleSingleTrip = async item => {
        await navigate(`${item.id}`);
     };

  return (
    <div className='w-full flex flex-col gap-4 px-4 py-4 rounded-xl shadow-xl bg-white '>

         <div className='w-full flex justify-between items-center '>
            <img src={item.company_logo} alt={item.company_logo} className='w-10 h-10 rounded-full shadow-xl ' />
            <span className='text-gray-800 '>{item.date}</span>
         </div>

         <div className='w-full flex justify-between items-center'>
            <div className='flex justify-start items-center gap-2 '>
            <div className="border-gray-800 border-l-2 w-2 h-20 border-dashed" />
            <div className='flex flex-col items-start gap-2 '>
               <span>{item.from_location.name}</span>
               <CarIcon  />
               <span>{item.to_location.name}</span>
            </div>
           
            </div>
            <div className='flex flex-col items-center gap-2'>
            <span className='seat '></span>
            <span className='text-gray-600'>{item.bus.seats_number} seats</span>
            </div>
         </div>

         <div className='w-full  flex justify-between items-center '>
            <span>{item.bus.name} model {item.bus.model}</span>
            <img src={item.bus.featured_image} alt={item.bus.featured_image} className='w-20 h-10 rounded-md shadow-xl ' />
         </div>

         <div className='w-full flex justify-between items-center '>
            <div className='flex justify-start item-center gap-2 '>
            <span className='px-2 py-1 text-gray-800 rounded-xl bg-gray-300'>discount {item.discount}</span>
            <span className='px-2 py-1 text-gray-800 rounded-xl bg-yellow-300'>price {item.price} EGP</span>
            </div>
            <button
              onClick={() => handleSingleTrip(item)}
              className="w-20 h-10 bg-gray-900 text-white rounded-lg  hover:bg-gray-800 transition-all duration-300 px-2"
            >
              select
            </button>
         </div>
    </div>
  )
}
