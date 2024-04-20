import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { One_way_form } from "./One_way_form";
import { Two_way_form } from "./Two_way_form";
import { Toggle_trip } from "../../../sheard/Toggle_trip";

export const Bus_search_form = () => {
  const [converter_trip, set_converter_trip] = useState("oneway");






  return (
    <div className="w-full flex flex-col items-start  ">
      {converter_trip === "oneway" &&
        <One_way_form
          set_converter_trip={set_converter_trip}
          converter_trip={converter_trip}
        />}
      {converter_trip === "twoway" && <Two_way_form
       set_converter_trip={set_converter_trip}
       converter_trip={converter_trip}
      />}
      <Toggle_trip set_converter_trip={set_converter_trip} converter_trip={converter_trip} />
    </div>
  );
};
