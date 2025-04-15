import React, { useEffect, useState } from "react";
import { BusIcon } from "../../sheard/BusIcon";
import {search_bus_trip} from '../../redux/actions/bus_travel_actions/bus_travel_actions'
import {useSelector , useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {formatDate} from '../../utils/FormatDate'
export const YourTrips = () => {
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const TripCard = () => {

    const { data, loading } = useSelector(state => state.busSearch);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchAttempted, setSearchAttempted] = useState(false); // New state to track search attempts

    const today =  getTodayDate();

    const cardData = [
      {
        id: 1,
        from: 1,
        to: 2,
        icon: <BusIcon />,
        startDate: today,
        toName: "Alx",
        formName: "cairo"
      },
      {
        id: 2,
        from: 1,
        to: 4,
        icon: <BusIcon />,
        startDate: today,
        toName: "Hurghada",
        formName: "cairo"
      },
      {
        id: 1,
        from: 1,
        to: 5,
        icon: <BusIcon />,
        startDate: today,
        toName: "Dahab",
        formName: "cairo"
      },
      {
        id: 1,
        from: 2,
        to: 1,
        icon: <BusIcon />,
        startDate: today,
        toName: "cairo",
        formName: "Alx"
      }
    ];

    const handleCardTrip = async (item) => {
      await dispatch(search_bus_trip(item.from , item.to , item.startDate ))
      setSearchAttempted(true) 
    }

    useEffect(() => {
      if(searchAttempted){
        if (data && data.length > 0) {
          navigate('busTrips');
          toast.success("Search success! Please wait...");
        } else if (!loading) {
          toast.dark("No trips found for the selected cities.");
        }
      }
    }, [data, loading , navigate , searchAttempted]);

    return (
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Card */}
          {cardData.map((item) => {
            return (
              <div key={item.id} className="bg-white flex flex-col  items-center Clip gap-4 p-4 w-50 h-auto rounded-xl shadow-md hover:scale-110 max-md:hover:scale-105 transform duration-200 cursor-pointer ">
                <div className="w-full h-20 flex justify-between items-center gap-4">
                  <span className="">{item.formName}</span>
                  <span>------ &gt; </span>
                  <BusIcon />
                  <span>------ &gt; </span>
                  <span>{item.toName}</span>
                </div>
                <div className="w-full h-14 flex justify-between items-center ">
                  <p>
                    Today's Date: {item.startDate}
                  </p>
                  <button onClick={() => handleCardTrip(item)} className="px-8 py-2 bg-gray-800 rounded-xl text-white flex justify-center items-center gap-2">
                    <span>search</span> {loading && <FaSpinner />}
                  </button>
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
