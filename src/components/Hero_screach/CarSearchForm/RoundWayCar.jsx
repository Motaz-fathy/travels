import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { useSelector } from "react-redux";
import { ComboBoxFrom } from "./ComponentCar/ComboBoxFrom";
import { ComboBoxTo } from "./ComponentCar/ComboBoxTo";
import { RangeDatePicker } from "../../../sheard/DatePicker";
import { NavigateSearchRoundWay } from "./ComponentCar/NavigateSearchRoundWay";
export const RoundWayCar = () => {
  const { tripType } = useSelector(state => state.tripReducer);

  const [onSelectFrom, setonSelectFrom] = useState(null);
  const [onSelectTo, setonSelectTo] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //  animation effect
  useEffect(
    () => {
      gsap.from(`.${tripType}`, {
        y: "20px",
        opacity: 0,
        duration: 0.5,
        stagger: 0.2
      });

      gsap.to(`.${tripType}`, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2
      });
    },
    [tripType]
  );

  return (
    <div className=" w-full flex flex-col items-start max-md:mt-4 ">
      <form className=" w-full h-20  flex justify-between items-center gap-2  max-md:flex-col max-md:h-auto">
        <ComboBoxFrom setonSelectFrom={setonSelectFrom} />

        <ComboBoxTo setonSelectTo={setonSelectTo} />

        <div className="z-10 max-md:w-full">
          <RangeDatePicker
            setStartDate={setStartDate}
            startDate={startDate}
            setEndDate={setEndDate}
            endDate={endDate}
            converter_trip={tripType}
          />
        </div>

        <div className={`${tripType} max-md:w-full z-0`}>
          <NavigateSearchRoundWay
            onSelectFrom={onSelectFrom}
            onSelectTo={onSelectTo}
            startDate={startDate !== null && startDate}
            endDate={endDate !== null && endDate}
          />

        </div>
      </form>
    </div>
  );
};
