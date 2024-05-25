import React from "react";
import { CarIcon } from "../../sheard/CarIcon";

import { useNavigate } from "react-router-dom";
import { prevStep } from "../../redux/actions/Ui/UiActions";
import { useDispatch } from "react-redux";

export const CarHeader = ({ trip }) => {
  // handle navigate back
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const HandleNavigationBack = () => {
    dispatch(prevStep());
    navigate(-1);
  };

  return (
    <div className='w-full h-40 bg-gray-800 BusHeader rounded-b-full  flex justify-center items-start py-8 '>
       <div className='w-full px-8 flex flex-col items-center gap-2 '>
        {/* back button  */}
        <div className=' w-full flex justify-between items-center '>
            <button className=' bg-gray-600 text-white w-8 h-8 flex justify-center items-center rounded-full ' onClick={HandleNavigationBack}> {"<"} </button>
        </div>
        {/* info of trips  */}
        <div className='flex justify-center items-center gap-2 text-white'>
          <span>{trip?.from_location?.name}</span>
           <span className='bg-white w-20 h-1 rounded-full'></span>

            <CarIcon lable={"car"} />
          <span className='bg-white w-20 h-1 rounded-full'></span>
          <span>{trip?.to_location?.name}</span>
        </div>

        <div className='text-white'> {trip?.date} </div>
       </div>
    </div>
  )
};
