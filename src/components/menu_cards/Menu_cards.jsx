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
     <div className="text-white bg-gray-200 w-full h-64">

     </div>
  );
};
