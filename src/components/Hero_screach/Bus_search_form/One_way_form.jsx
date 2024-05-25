import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { SingleDatePicker } from "../../../sheard/DatePicker";
import { Navigate_search_submit } from "./Navigate_search_submit";
import { Combo_box_from } from "../../../sheard/Combo_box_from";
import { Combo_box_to } from "../../../sheard/Combo_box_to";

export const One_way_form = ({ converter_trip }) => {
  const [onSelect_from, setonSelect_from] = useState(null);
  const [onSelect_to, setonSelect_to] = useState(null);
  const [startDate, setStartDate] = useState(null);




  useEffect(
    () => {
      gsap.from(`.${converter_trip}`, {
        y: "20px",
        opacity: 0,
        duration: 0.5,
        stagger: 0.2
      });

      gsap.to(`.${converter_trip}`, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2
      });
    },
    [converter_trip]
  );



  return (
    <div className=" w-full flex flex-col items-start max-md:mt-4 ">
      <form className=" w-full h-20  flex justify-between items-center gap-2  max-md:flex-col max-md:h-auto">
        <Combo_box_from
          setonSelect_from={setonSelect_from}
          converter_trip={converter_trip}
        />

        <Combo_box_to
          setonSelect_to={setonSelect_to}
          converter_trip={converter_trip}
        />

       <div className="z-10 max-md:w-full">
       <SingleDatePicker
          setStartDate={setStartDate}
          startDate={startDate}
          converter_trip={converter_trip}
        />
       </div>

        <div className={`${converter_trip} max-md:w-full z-0`}>
          <Navigate_search_submit
            onSelect_from={onSelect_from}
            onSelect_to={onSelect_to}
            startDate={startDate !== null && startDate}
          />
          
        </div>
      </form>
    </div>
  );
};
