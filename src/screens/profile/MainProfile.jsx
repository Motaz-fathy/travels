import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProfileTicket } from "../../redux/actions/profile/profile_actions";
import { Tickets } from "./Tickets";
import { Addresses } from "./Addresses";
import { BusIcon } from "../../sheard/BusIcon";
import { FlightIcon } from "../../sheard/FlightIcon.jsx";
import { MariTimeIcon } from "../../sheard/MariTimeIcon.jsx";
import { CarIcon } from "../../sheard/CarIcon.jsx";
import Slider from "../../sheard/Slider";
import { Navbar } from "../../components/Navbar/Navbar.jsx";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Footer } from "../../components/Footer.jsx";
import { MdMail } from "react-icons/md";
import {DeleteAccAction} from '../../redux/actions/user/User.js'
import { ToastContainer , toast } from "react-toastify";

export const MainProfile = () => {
  const [activeTab, setActiveTab] = useState("bus");
  const loginReducer = useSelector(state => state.LoginReducer);
  const data = loginReducer.data.data;
  const dispatch = useDispatch();
  const navigate = useDispatch()
  const {message} = useSelector(state => state.DeleteAccReducer) 
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

  const handleDeleteAccount = async () => {
   await dispatch(DeleteAccAction(data.api_token))
  }
  useEffect(() => {
    if(message) {
      toast.success(message)
      navigate('/register')
    }
  } , [message , navigate , dispatch ])

  return (
    <div className="bg-gray-200 flex flex-col w-full overflow-hidden">
      <Navbar />

      <header className=" shadow flex flex-col items-center gap-4 w-full   ">
        <div className=" mx-auto flex justify-between items-center h-60 bg-gray-800 w-full BusHeader rounded-b-full rounded-full">
          <div className=" w-full  flex justify-center items-center gap-4 ">
            <div className="rounded-full bg-gray-800 h-40 w-40 flex justify-center items-center border-4 border-gray-100  ">
              {/* Your profile avatar */}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-start w-full px-12 max-md:px-2">
          <div />
          <div className="   flex flex-col items-start gap-1 text-center ">
            <span className="text-2xl text-gray-800 w-full">Hi there , </span>
            <div className="w-full flex justify-around items-center gap-2 ">
              <span className="font-bold text-gray-800  text-2xl">
                {data.name}
              </span>{" "}
            </div>
            <div className=" flex justify-center items-center gap-4  text-gray-600  text-md ">
              <span className="flex justify-center items-center gap-2">
                {" "}<MdMail /> {data.email}{" "}
              </span>{" "}
              <span className="flex justify-center items-center gap-2">
                {" "}<FaPhone /> {data.phonecode} + {data.mobile}
              </span>
            </div>
            <button className="w-full h-10 bg-gray-900 hover:bg-gray-800 transition-all duration-300  text-gray-200 rounded-full ">
              edit profile{" "}
            </button>
            <button
            onClick={handleDeleteAccount} 
            className="w-full h-10 bg-red-900 hover:bg-red-800 transition-all duration-300  text-gray-200 rounded-full ">
              delete account {" "}
            </button>
          </div>
          <div />
        </div>
      </header>

      <nav className="bg-gray-200  py-4 w-full">
        <div className="container mx-auto flex justify-center mt-4">
          <Slider>
            <button
              className={`w-auto h-10 rounded-full px-6 py-2 focus:outline-none flex justify-center items-center gap-0 ${activeTab ===
              "bus"
                ? "bg-gray-800 text-white"
                : "text-gray-600 bg-gray-200"}`}
              onClick={() => handleTabChange("bus")}
            >
              <BusIcon lable={activeTab} />
              <span className="w-32">bus tickets</span>
            </button>

            <button
              className={`w-auto h-10 rounded-full px-6 py-2 focus:outline-none flex justify-center items-center gap-0 ${activeTab ===
              "flight"
                ? "bg-gray-800 text-white"
                : "text-gray-600 bg-gray-200"}`}
              onClick={() => handleTabChange("flight")}
            >
              <FlightIcon lable={activeTab} />
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

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};
