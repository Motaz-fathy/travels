import gsap from "gsap";
import React, { useEffect } from "react";
import Slider from "../../sheard/Slider";
import { useDispatch, useSelector } from "react-redux";
import { SingleBusTrip } from "../../redux/actions/bus_travel_actions/bus_travel_actions";
import { useNavigate } from "react-router-dom";

export const Menu_cards = ({ open_menu }) => {
  useEffect(
    () => {
      // Animate each card after 0.2s delay in sequence
      if (open_menu) {
        gsap.from(".menu-card", {
          x: "100%",
          y: "-50px",
          opacity: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: "power2.out"
        });
      }
    },
    [open_menu]
  );
  const {data} = useSelector(state => state.busSearch)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSingleTrip = async (item) => {
    await dispatch(SingleBusTrip(item))
    navigate(`${item.id}`)
   }
  return (

    
          <Slider>
          {/* {data.data.map(trip => {
            return (
              <div className="bg-white  rounded-lg shadow-lg  backdrop-filter backdrop-blur-lg menu-card  ">
              <div className="flex flex-col items-center gap-2 w-[350px]  h-auto px-2 py-2">
                <div className="flex justify-between items-center w-full">
                  <img src={trip.company_data.avatar} alt={trip.company_data.name} height={40} width={40} />
                   <span>{trip.time}</span>
                </div>
      
                <div className="flex justify-between items-center w-full">
                  <div className="flex justify-start items-center gap-2 ">
                    <div className="border-gray-400 border-l-2 w-2 h-40"></div>
                    <div className="flex flex-col items-start gap-2 ">
                    <span>{trip.cities_from[0].name} ({trip.stations_from[0].name}) </span>
                    <span>{trip.stations_from[0].arrival_at}</span>
                    <span>{trip.cities_to[0].name} ({trip.stations_to[0].name}) </span>
                    <span>{trip.stations_to[0].arrival_at}</span>
                    </div>
      
                  </div>
                  <img src={trip.company_data.bus_image} alt={trip.company_data.name}  width={100} height={50}/>
                </div>
                 
                 <div  className="flex justify-between items-center w-full">
                  <span className="px-2 py-1 rounded-2xl bg-gray-600 text-white">{trip.bus.category}</span>
                  <div className="flex justify-center items-center gap-2 ">
                    <div className="flex flex-col items-end gap-2 ">
                      <span>{trip.price_start_with} EL</span>
                      <span className="text-[10px]">price per person </span>
                    </div>
                     <button onClick={ () => handleSingleTrip(trip) } className="w-20 h-10 bg-gray-900 text-white rounded-lg  px-2"> select </button>
                  </div>
                 </div>
      
              </div>
            </div>
            );
          })} */}
        </Slider>
  
      
  );
};
