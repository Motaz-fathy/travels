import React, { useState } from "react";
import { ToggleTrip } from "../../../sheard/Toggle_trip";
import { useSelector } from "react-redux";
import {OneWayFlight} from './OneWayFlight'
import {RoundWayFlight} from './RoundWayFlight'
export const FlightSearchForm = () => {
  const [converter_trip, set_converter_trip] = useState("oneway");
  const { tripType } = useSelector(state => state.tripReducer);  
  return (
    <div className="w-full flex flex-col items-start   gap-2  max-md:flex-col ">
    {tripType === "oneWay" && <OneWayFlight />}
    {tripType === "round" && <RoundWayFlight />}

    {/* switch type trip  */}
    <ToggleTrip
      set_converter_trip={set_converter_trip}
      converter_trip={converter_trip}
    />
  </div>
  )
}
