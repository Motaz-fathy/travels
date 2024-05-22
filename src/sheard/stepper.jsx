// Stepper.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../redux/actions/Ui/UiActions";
import Slider from "../sheard/Slider";

export const Stepper = () => {
  const dispatch = useDispatch();
  const { activeStep } = useSelector(state => state.stepReducer);
  const { tripType } = useSelector(state => state.tripReducer);
  const steps = tripType === "oneWay" ? 3 : 4;

  const handleNext = () => {
    dispatch(nextStep(tripType));
  };

  const handlePrev = () => {
    dispatch(prevStep(tripType));
  };

  return (
    <div className="w-5/6  h-10 flex justify-start items-start">
      {tripType === "oneWay" &&
        <div className="w-full h-full flex justify-start items-center gap-2">
          <span
            className={`px-10 arrow flex justify-center items-center rounded-full  h-full   ${activeStep >=
            0
              ? "bg-gray-800 text-gray-200 "
              : "bg-gray-100"}`}
          >
            select trip{" "}
          </span>

          <span
            className={`px-10 arrow flex justify-center items-center rounded-full  h-full   ${activeStep >=
            1
              ? "bg-gray-800 text-gray-200 "
              : "bg-gray-100"}`}
          >
            select chair {" "}
          </span>
          <span
            className={`px-10 arrow flex justify-center items-center rounded-full  h-full   ${activeStep >=
            2
              ? "bg-gray-800 text-gray-200 "
              : "bg-gray-100"}`}
          >
            checkout {" "}
          </span>
        </div>}

        {tripType === "round" && (
        <div className="w-full flex justify-start items-center text-sm ">
             <Slider>
             <span
                className={`arrow w-1/5 min-w-[150px] h-10 py-2 flex justify-center items-center rounded-full ${activeStep >= 0 ? "bg-gray-800 text-gray-200" : "bg-gray-100"}`}
              >
                Select Trip
              </span>
              <span
                className={`arrow w-1/5 min-w-[150px] h-10 py-2 flex justify-center items-center rounded-full ${activeStep >= 1 ? "bg-gray-800 text-gray-200" : "bg-gray-100"}`}
              >
                Select Chair
              </span>
              <span
                className={`arrow w-1/5 min-w-[150px] h-10 py-2 flex justify-center items-center rounded-full ${activeStep >= 2 ? "bg-gray-800 text-gray-200" : "bg-gray-100"}`}
              >
                 Return Trip
              </span>
              <span
                className={`arrow w-1/5 min-w-[150px] h-10 py-2 flex justify-center items-center rounded-full ${activeStep >= 3 ? "bg-gray-800 text-gray-200" : "bg-gray-100"}`}
              >
                 Return Chair
              </span>
              <span
                className={`arrow w-1/5 min-w-[150px] h-10 py-2 flex justify-center items-center rounded-full ${activeStep >= 4 ? "bg-gray-800 text-gray-200" : "bg-gray-100"}`}
              >
                Checkout
              </span>
             </Slider>
        </div>
      )}

    </div>
  );
};
