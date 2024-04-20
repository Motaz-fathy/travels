import React from "react";

export const Toggle_trip = ({ set_converter_trip, converter_trip }) => {
  return (
    <div className="flex justify-start items-center gap-2 ">
      <div
        className="flex justify-center items-center gap-1 cursor-pointer "
        onClick={() => set_converter_trip("oneway")}
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
        onClick={() => set_converter_trip("twoway")}
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
