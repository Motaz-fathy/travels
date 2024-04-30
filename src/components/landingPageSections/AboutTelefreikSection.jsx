import React from "react";

export const AboutTelefreikSection = () => {
  const cardData = [
    {
      icon: "icon 1",
      paragraph: "Big names, great deals"
    },
    {
      icon: "icon 2",
      paragraph: "Search without worry"
    },
    {
      icon: "icon 3",
      paragraph: "Book with flexibility"
    },
    {
      icon: "icon 4",
      paragraph: "Trusted and free"
    }
  ];
  return (
    <div className="w-full h-96 max-sm:h-auto bg-gray-800 flex justify-center items-center relative  px-10 ">
      <div className="flex flex-col items-center w-full gap-8">
        <div className="flex flex-col items-start gap-4 w-full ">
          <div className="text-4xl w-full font-bold text-white mt-10">
            What Telefreik brings to the table .
          </div>
          <div className="text-lg w-2/5 text-gray-300 max-sm:w-5/6">
            Telefreik is a safe, easy and fast application that enables you to
            search and compare prices and different modes in different times,
            classes and classes of trips. It's like searching more than 10
            search engines simultaneously with just a click of a button.
          </div>
        </div>
        <div className="  flex justify-center items-center  w-5/6 gap-6 max-sm:gap-2 max-sm:grid max-sm:grid-cols-2  translate-y-20 max-sm:translate-y-0">
          {cardData.map((card, index) => {
            return (
              <div
                key={index}
                className="w-40  h-32 px-2 bg-white flex justify-center items-center  shadow-lg   rounded-lg "
              >
                <div className=" flex flex-col items-center gap-2 text-center rounded-lg">
                  <span>
                    {card.icon}
                  </span>
                  <span>
                    {card.paragraph}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
};
