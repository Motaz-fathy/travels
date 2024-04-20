import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { Single_date_picker } from "../../../sheard/DatePicker";
import { Navigate_search_submit } from "../../../sheard/Navigate_search_submit";
import { Combo_box_from } from "../../../sheard/Combo_box_from";
import { Combo_box_to } from "../../../sheard/Combo_box_to";

export const One_way_form = ({ converter_trip }) => {
  const [onSelect_from, setonSelect_from] = useState(null);
  const [onSelect_to, setonSelect_to] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const options = [
    {
      name: "ahmed"
    },
    {
      name: "yousif"
    }
  ];

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
    <div className="w-full flex flex-col items-start ">
      <form className="w-full h-20  flex justify-between items-center gap-2  " >
        <Combo_box_from
          options={options}
          setonSelect_from={setonSelect_from}
          converter_trip={converter_trip}
        />

        <Combo_box_to
          options={options}
          setonSelect_to={setonSelect_to}
          converter_trip={converter_trip}
        />

        <Single_date_picker setStartDate={setStartDate} startDate={startDate} />

        <div className={converter_trip}>
          <Navigate_search_submit
            onSelect_from={onSelect_from}
            onSelect_to={onSelect_to}
            startDate={
              startDate !== null && startDate
            }
          />
        </div>
      </form>
    </div>
  );
};
