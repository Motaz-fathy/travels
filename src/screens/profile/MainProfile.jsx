import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProfileTicket } from "../../redux/actions/profile/profile_actions";
import { Tickets } from "./Tickets";
import { Addresses } from "./Addresses";
import { BusIcon } from "../../sheard/BusIcon";
import {FlightIcon} from '../../sheard/FlightIcon.jsx'
import {MariTimeIcon} from '../../sheard/MariTimeIcon.jsx'
import {CarIcon} from '../../sheard/CarIcon.jsx'
import Slider from "../../sheard/Slider";
import {Navbar} from '../../components/Navbar/Navbar.jsx'
import { FaMapMarkerAlt } from 'react-icons/fa';
export const MainProfile = () => {
  const [activeTab, setActiveTab] = useState("bus");
  const loginReducer = useSelector(state => state.LoginReducer);
  const data = loginReducer.data.data;
  const dispatch = useDispatch();
  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  useEffect(
    () => {
      if (activeTab === "bus") {
        dispatch(GetProfileTicket(data.api_token));
      }
    },
    [activeTab, data, dispatch]
  );

  const { tickets } = useSelector(state => state.TicketReducer);
  return (
    <div className="bg-gray-100 flex flex-col w-full overflow-hidden">
      <Navbar />
      <header className="bg-white shadow flex flex-col items-center gap-4 w-full  pb-10">
        <div className=" mx-auto flex justify-between items-center h-60 bg-gray-800 w-full ">
          <div className=" w-full  flex justify-center items-center gap-4 ">
            <div className="rounded-full bg-gray-800 h-40 w-40 flex justify-center items-center border-4 border-gray-100  ">
              {/* Your profile avatar */}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-start w-full px-12 max-md:px-2">
          <div className="   flex flex-col items-start gap-2 ">
            <div className=" flex justify-around items-center gap-6 ">
              <span className="font-bold text-gray-800  text-2xl">
                {data.name}
              </span>{" "}
              <span className="text-gray-600  text-md">
                {data.phonecode} {data.mobile}
              </span>
            </div>
            <span className=" text-gray-600  text-md ">
              {data.email}
            </span>
          </div>
          <button className="w-32 h-10 bg-gray-800 text-gray-200 rounded-full ">
            edit profile{" "}
          </button>
        </div>
      </header>

      <nav className="bg-gray-50 py-4">
        <div className="container mx-auto flex justify-center mt-4">
        <Slider>
        <button
            className={`w-auto h-10 rounded-full px-6 py-2 focus:outline-none flex justify-center items-center gap-0 ${activeTab ===
            "bus"
              ? "bg-gray-800 text-white"
              : "text-gray-600 bg-gray-200"}`}
            onClick={() => handleTabChange("bus")}
          >
            <BusIcon lable={activeTab}/>
            <span className="w-32">bus tickets</span>
          </button>

          <button
            className={`w-auto h-10 rounded-full px-6 py-2 focus:outline-none flex justify-center items-center gap-0 ${activeTab ===
            "flight"
              ? "bg-gray-800 text-white"
              : "text-gray-600 bg-gray-200"}`}
            onClick={() => handleTabChange("flight")}
          >
            <FlightIcon lable={activeTab}/>
            <span className="w-32">flight tickets</span> 
          </button>

          <button
            className={`w-auto h-10 rounded-full px-6 py-2 focus:outline-none flex justify-center items-center gap-0 ${activeTab ===
            "maritime"
              ? "bg-gray-800 text-white"
              : "text-gray-600 bg-gray-200"}`}
            onClick={() => handleTabChange("maritime")}
          >
            <MariTimeIcon lable={activeTab} />
            <span className="w-32">maritime tickets</span> 
          </button>

          <button
            className={`w-auto h-10 rounded-full px-6 py-2 focus:outline-none flex justify-center items-center gap-0 ${activeTab ===
            "car"
              ? "bg-gray-800 text-white"
              : "text-gray-600 bg-gray-200"}`}
            onClick={() => handleTabChange("car")}
          >
            <CarIcon lable={activeTab} />
            <span className="w-32">car tickets</span> 
          </button>

          <button
            className={`w-auto rounded-full px-6 py-2 focus:outline-none flex justify-center items-center gap-0 ${activeTab ===
            "addresses"
              ? "bg-gray-800 text-white"
              : "text-gray-600 bg-gray-200"}`}
            onClick={() => handleTabChange("addresses")}
          >
            <FaMapMarkerAlt size={20} />
            <span className="w-32">addresses</span> 
          </button>


        </Slider>
        </div>
      </nav>

      <div className="container mx-auto py-8 flex justify-around items-start gap-6 ">

       <div className="flex flex-col w-full items-state ">
       {activeTab === "bus" && <Tickets tickets={tickets} />}
        {activeTab === "addresses" && <Addresses />}
       </div>
      </div>
    </div>
  );
};
