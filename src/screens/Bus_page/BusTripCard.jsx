import React from "react";
import { SingleBusTrip } from "../../redux/actions/bus_travel_actions/bus_travel_actions";
import { useDispatch  , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { nextStep } from "../../redux/actions/Ui/UiActions";
export const BusTripCard = ({ trip }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    company_data,
    time,
    cities_from,
    cities_to,
    stations_from,
    stations_to,
    bus,
    price_start_with
  } = trip;
  
  const { tripType } = useSelector(state => state.tripReducer);

  const handleSingleTrip = async item => {
     dispatch(nextStep(tripType));
     dispatch(SingleBusTrip(item));
     await navigate(`${item.id}`);
  };

  return (
    <div className="bg-white  rounded-lg shadow-lg p-6 mb-4 backdrop-filter backdrop-blur-lg ">
      <div className="flex flex-col items-center gap-2 w-full ">
        <div className="flex justify-between items-center w-full">
          <img
            src={company_data.avatar}
            alt={company_data.name}
            height={40}
            width={40}
            className="rounded-full shadow-xl"
          />
          <span>
            {time}
          </span>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex justify-start items-center gap-2 ">
            <div className="border-gray-800 border-l-2 w-2 h-36 border-dashed" />
            <div className="flex flex-col items-start gap-2 ">
              <span>
                {cities_from[0].name} ({stations_from[0].name}){" "}
              </span>
              <span>
                {stations_from[0].arrival_at}
              </span>
              <span>
                {cities_to[0].name} ({stations_to[0].name}){" "}
              </span>
              <span>
                {stations_to[0].arrival_at}
              </span>
            </div>
          </div>
          <img
            src={company_data.bus_image}
            alt={company_data.name}
            width={100}
            height={50}
            className="rounded-xl"
          />
        </div>

        <div className="flex justify-between items-center w-full">
          <span
            className={`px-2 py-1 rounded-2xl  text-white 
            ${bus.category === "V_i_p" && "bg-sky-600"}
            ${bus.category === "Business 40" && "bg-red-600"}
            ${bus.category === "Economy" && "bg-emerald-600"}
            ${bus.category === "Comfort" && "bg-rose-600"}
            ${bus.category === "Prime_Mix" && "bg-indigo-600"}
            ${bus.category === "First8" && "bg-gray-600"}
            `}
          >
            {bus.category}
          </span>
          <div className="flex justify-center items-center gap-2 ">
            <div className="flex flex-col items-end gap-2 ">
              <span>
                {price_start_with} EL
              </span>
              <span className="text-[10px]">price per person </span>
            </div>
            <button
              onClick={() => handleSingleTrip(trip)}
              className="w-20 h-10 bg-gray-900 text-white rounded-lg  hover:bg-gray-800 transition-all duration-300 px-2"
            >
              {" "}select{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
