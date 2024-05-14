import React from 'react'
import { BusIcon } from '../../sheard/BusIcon'
import { useNavigate } from 'react-router-dom'

export const BusHeader = ({trip}) => {
    // handle navigate back 
    const navigate = useNavigate()
    const HandleNavigationBack = () => {
        navigate(-1)
    } 
  return (
    <div className='w-full h-40 bg-gray-800 BusHeader  flex justify-center items-start py-2 '>
       <div className='w-full px-8 flex flex-col items-center gap-2 '>
        {/* back button  */}
        <div className=' w-full flex justify-between items-center '>
            <button className=' bg-gray-600 text-white w-8 h-8 flex justify-center items-center rounded-full ' onClick={HandleNavigationBack}> {"<"} </button>
        </div>
        {/* info of trips  */}
        <div className='flex justify-center items-center gap-2 text-white'>
          <span>{trip?.cities_from[0]?.name}</span>
           <span className='bg-white w-20 h-1 rounded-full'></span>

            <BusIcon lable={"bus"} />
          <span className='bg-white w-20 h-1 rounded-full'></span>
          <span>{trip?.cities_to[0]?.name}</span>
        </div>

        <div className='text-white'> {trip?.date} </div>
       </div>
    </div>
  )
}
