import React from "react";
import { setTripType } from "../redux/actions/user/User";
import { useDispatch } from "react-redux";
export const Toggle_trip = ({ set_converter_trip, converter_trip }) => {
  const dispatch = useDispatch()
  const handleOneWay = () => {
        dispatch(setTripType("oneWay"))
  }
  const handleRound = () => {
    dispatch(setTripType("round"))
}
  return (
    <div className="flex justify-start items-center gap-2  text-white">
      <div
        className="flex justify-center items-center gap-1 cursor-pointer "
        onClick={() => {set_converter_trip("oneway")
          handleOneWay()
        }}
      >
        <div
          className={`w-3 h-3 rounded-full ${converter_trip === "oneway"
            ? "bg-gray-800"
            : "bg-gray-400"} `}
        />
        <span>one way </span>
      </div>

      <div
        className="flex justify-center items-center gap-1 cursor-pointer "
        onClick={() => {
        set_converter_trip("twoway")
        handleRound()
        }}
      >
        <div
          
          className={`w-3 h-3 rounded-full ${converter_trip === "twoway"
            ? "bg-gray-800"
            : "bg-gray-400"} `}
        />
        <span>two way </span>
      </div>
    </div>
  );
};
