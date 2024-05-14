import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const AboutTelefreikSection = () => {


  useEffect(() => {
    // Create a GSAP timeline

    const timeline = gsap.timeline({
      defaults: { duration: 0.5, stagger: 0.2 }
    });

    const timecards = gsap.timeline({
      defaults: {
        duration: 0.5,
        stagger: 0.2
      }
    });

 // create for card animation
 ScrollTrigger.create({
  animation: timeline,
  trigger: ".aboutText",
  start: "top 90%", // Starts animation when the Title is 90% in view
  end: "bottom 10%", // Ends animation when the Title is 10% out of view
  onEnterBack: () => {
    timeline.fromTo(
      ".aboutText",
      { opacity: 0, y: "50px" },
      { opacity: 1, y: 0 }
    );
  },

  onEnter: () => {
    timeline.fromTo(
      ".aboutText",
      { opacity: 0, y: "50px" },
      { opacity: 1, y: 0 }
    );
  }
});
    // create for card animation
    ScrollTrigger.create({
      animation: timecards,
      trigger: ".card",
      start: "top 90%", // Starts animation when the Title is 90% in view
      end: "bottom 10%", // Ends animation when the Title is 10% out of view
      onEnterBack: () => {
        timecards.fromTo(
          ".card",
          { opacity: 0, y: "50px" },
          { opacity: 1, y: 0 }
        );
      },

      onEnter: () => {
        timecards.fromTo(
          ".card",
          { opacity: 0, y: "50px" },
          { opacity: 1, y: 0 }
        );
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Clean up ScrollTriggers
    };
  }, []);

  // data icons

  const cardData = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
          />
        </svg>
      ),
      paragraph: "Big names, great deals"
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      ),
      paragraph: "Search without worry"
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
          />
        </svg>
      ),
      paragraph: "Book with flexibility"
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
          />
        </svg>
      ),
      paragraph: "Trusted and free"
    }
  ];

  return (
    <div className="w-full h-auto max-sm:h-auto  bg-gray-800 flex justify-center items-center relative  px-10 max-md:py-10   ">
      <div className="flex flex-col items-center w-full gap-8">
        <div className="flex flex-col items-start gap-4 w-full ">
          <div className="text-4xl w-full font-bold text-white mt-10 aboutText">
            What Telefreik brings to the table .
          </div>
          <div className="text-lg w-2/5 text-gray-300 max-sm:w-5/6 aboutText">
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
                className="w-40 -rotate-3 Clip h-32 px-2 bg-gray-800 flex justify-center items-center  shadow-lg  card rounded-lg text-yellow-300"
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
