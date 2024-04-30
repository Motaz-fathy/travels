import React from "react";
import Slider from "../../sheard/Slider";

export const OurPartener = () => {
  const logos = [
    {
      src: "icon 1 "
    },
    {
      src: "icon 2 "
    },
    {
      src: "icon 3 "
    },
    {
      src: "icon 4 "
    },
    {
      src: "icon 5 "
    },
    {
      src: "icon 6 "
    },
    {
      src: "icon 7 "
    }
  ];
  return (
    <div className=" w-full mx-auto flex flex-col items-center gap-4 mt-24 py-20">
      <span className="text-4xl font-bold text-gray-800 ">Our partner</span>
      <span className="text-lg font-bold text-gray-600 px-8 max-md:px-2 mx-auto text-center ">
        Our partner is an invaluable ally in our mission to provide exceptional
        products and services to our customers. With their expertise,
        experience, and shared values, they bring a wealth of knowledge and
        resources to our collaboration. Together, we strive to deliver
        innovative solutions that exceed expectations and drive mutual success.
      </span>
      <div className=" w-full  ">
        <Slider>
          {logos.map((item, index) => {
            return (
              <div
                key={index}
                className=" bg-white  rounded-lg shadow-lg  backdrop-filter backdrop-blur-lg px-32 py-32"
              >
                {item.src}
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};
