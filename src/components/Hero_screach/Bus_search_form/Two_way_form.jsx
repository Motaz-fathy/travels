import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { RangeDatePicker } from "../../../sheard/DatePicker";
import { Navigate_search_submit } from "../../../sheard/Navigate_search_submit";
import { Combo_box_from } from "../../../sheard/Combo_box_from";
import { Combo_box_to } from "../../../sheard/Combo_box_to";

export const Two_way_form = ({ converter_trip }) => {
  const [onSelect, setonSelect] = useState({});
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
      <form className="w-full h-20  flex justify-between items-center gap-2  ">
        <Combo_box_from
          options={options}
          setonSelect={setonSelect}
          converter_trip={converter_trip}
        />
        <Combo_box_to
          options={options}
          setonSelect={setonSelect}
          converter_trip={converter_trip}
        />
        <RangeDatePicker />
        <div className={converter_trip}>
          <Navigate_search_submit />
        </div>
      </form>
    </div>
  );
};
