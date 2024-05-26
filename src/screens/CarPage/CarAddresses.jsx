import React, { useEffect, useState, useCallback } from "react";
import { getAddressAction } from "../../redux/actions/profile/profile_actions";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "../../sheard/Popover";
import MapAndAutoComplete from "../../sheard/MapAndAutoComplete";
import { PickDate } from "./componentCar/PickDate";
import { RiCalendar2Fill } from "react-icons/ri";
import { FiClock } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { ComboAddress } from "./componentCar/ComboAddress";
import { convertTime } from "../../utils/ConvertTime";
import { toast } from "react-toastify";
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

import { createTicketCarAction } from "../../redux/actions/CarActions/CarActions";

export const CarAddresses = ({ trip }) => {
  // select ticket

  const { CarTicket, loading, error } = useSelector(
    state => state.createTicketCarReducer
  );

  //   select api_token to use in get address
  const { addressList } = useSelector(state => state.getAddressReducer);
  const loginReducer = useSelector(state => state.LoginReducer);
  let token = loginReducer.data.data.api_token || null;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  //   hook to get addresses
  const [selectedAddressFrom, setSelectedAddressFrom] = useState(null);
  const [selectedAddressTo, setSelectedAddressTo] = useState(null);
  //   hook to get time
  const [selectedTime, setSelectedTime] = useState(null);
  //   hook to open and hide map
  const [openMap, setOpenMap] = useState(false);
  const [openMapTo, setOpenMapTo] = useState(false);
  const handleTimeChange = date => {
    setSelectedTime(date);
  };

  const handleOpenMap = () => {
    setOpenMap(!openMap);
  };

  const handleOpenMapTo = () => {
    setOpenMapTo(!openMapTo);
  };

  useEffect(
    () => {
      dispatch(getAddressAction(token));
    },
    [dispatch, token, openMap]
  );

  //    handle checkout

  const handleCheckoutOneWay = async () => {
    if (selectedAddressFrom === null) {
      toast.error("sorry from address not selected  ");
      return;
    } else if (selectedAddressTo === null) {
      toast.error("sorry to address not selected ");
      return;
    } else if (selectedAddressFrom.id === selectedAddressTo.id) {
      toast.error("sorry this same addresses ");
      return;
    } else if (selectedTime === null) {
      toast.error("sorry select time  ");
      return;
    } else {
      const ticketData = {
        round: 1,
        boarding: {
          date: `${trip.date} ${convertTime(selectedTime)}`,
          from_address_id: selectedAddressFrom.id,
          to_address_id: selectedAddressTo.id
        }
      };
      await dispatch(createTicketCarAction(ticketData, trip.id, token));
      if (error) {
        toast.error(error);
        return;
      } else {
        toast.success(" ticket create successfully ");
        navigate('payment-ticket')
      }
    }
  };
  return (
    <div className=" w-full  flex  flex-col items-center gap-6 p-4 ">
      <span className="w-full text-start ">Pick Up Information</span>
      <div className="w-full flex justify-between items-center max-md:flex-col max-md:gap-4 ">
        <div className="w-1/3 max-md:w-full flex flex-col items-start gap-1 ">
          <span className="text-sm text-gray-600 ">Confirm Pickup Date</span>
          <div className="flex w-2/3 max-md:w-3/5 justify-start items-center gap-2 bg-white shadow-xl rounded-lg  px-4 border-[1px] border-gray-300 h-10">
            <RiCalendar2Fill />
            <span>
              {trip.date}
            </span>
          </div>
        </div>

        <div className="w-1/3 max-md:w-full flex flex-col items-start gap-1 ">
          <span className="text-sm text-gray-600 ">Confirm Pickup Time </span>
          <div className="flex w-2/3 max-md:w-3/5 justify-start items-center gap-2 bg-white shadow-xl rounded-lg  px-4 border-[1px] border-gray-300">
            <FiClock />
            <PickDate
              selectedTime={selectedTime}
              handleTimeChange={handleTimeChange}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex-col flex items-start gap-2 ">
        <span className="text-gray-600">
          {" "}select address from ({trip.from_location.name}){" "}
        </span>

        {/* comboBox here to select address from  */}
        <ComboAddress
          addresses={addressList}
          selectedAddressFrom={selectedAddressFrom}
          setSelectedAddressFrom={setSelectedAddressFrom}
          selectedAddressTo={selectedAddressTo}
          setSelectedAddressTo={setSelectedAddressTo}
          str={"from"}
        />

        <span
          onClick={handleOpenMap}
          className="flex justify-start items-center gap-1 text-gray-800 hover:text-gray-900 cursor-pointer "
        >
          <AiOutlinePlus /> add new address{" "}
        </span>
        <Popover
          className="custom-class"
          flag={openMap}
          onClose={handleOpenMap}
        >
          <MapAndAutoComplete />
          <button
            onClick={() => setOpenMap(false)}
            className="px-4 py-1 rounded-lg bg-gray-800 text-gray-200 "
          >
            Close
          </button>
        </Popover>
      </div>

      <div className="w-full flex-col flex items-start gap-2 ">
        <span className="text-gray-600">
          {" "}select address from ({trip.to_location.name}){" "}
        </span>

        {/* comboBox here to select address from  */}
        <ComboAddress
          addresses={addressList}
          selectedAddressFrom={selectedAddressFrom}
          setSelectedAddressFrom={setSelectedAddressFrom}
          selectedAddressTo={selectedAddressTo}
          setSelectedAddressTo={setSelectedAddressTo}
          str={"to"}
        />

        <span
          onClick={handleOpenMap}
          className="flex justify-start items-center gap-1 text-gray-800 hover:text-gray-900 cursor-pointer "
        >
          <AiOutlinePlus /> add new address{" "}
        </span>
        <Popover
          className="custom-class"
          flag={openMapTo}
          onClose={handleOpenMapTo}
        >
          <MapAndAutoComplete />
          <button
            onClick={() => setOpenMapTo(false)}
            className="px-4 py-1 rounded-lg bg-gray-800 text-gray-200 "
          >
            Close
          </button>
        </Popover>
      </div>
      <div className="w-full flex justify-end items-center ">
        <button
          onClick={handleCheckoutOneWay}
          className="w-1/5 max-md:w-full  px-4 py-2 bg-gray-900 rounded-xl text-gray-200 hover:bg-gray-800 transition-all duration-300 flex justify-center items-center gap-2 "
        >
          <span>checkout</span> {loading && <FaSpinner />}
        </button>
      </div>
    </div>
  );
};
