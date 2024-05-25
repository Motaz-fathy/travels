import React, { useState } from "react";
import { ToggleTrip } from "../../../sheard/Toggle_trip";
import { OneWayCar } from "./OneWayCar";
import { RoundWayCar } from "./RoundWayCar";
import { useSelector } from "react-redux";
export const CarSearchForm = () => {
  const [converter_trip, set_converter_trip] = useState("oneway");
  const { tripType } = useSelector(state => state.tripReducer);
  
  return (
    <div className="w-full flex flex-col items-start   gap-2  max-md:flex-col ">
      {tripType === "oneWay" && <OneWayCar />}
      {tripType === "round" && <RoundWayCar />}

      {/* switch type trip  */}
      <ToggleTrip
        set_converter_trip={set_converter_trip}
        converter_trip={converter_trip}
      />
    </div>
  );
};
