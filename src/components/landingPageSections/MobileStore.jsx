import React, { useEffect } from "react";
import { IoLogoApple, IoLogoAndroid } from "react-icons/io5";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export const MobileStore = () => {

  useEffect( () => {
  // inti time line for animation   
  const mobileStore = gsap.timeline({
    defaults : {
      stagger : 0.2 ,
      duration : 0.5 
    }
  })

 // create for card animation
 ScrollTrigger.create({
  animation: mobileStore,
  trigger: ".mobStore",
  start: "top 90%", // Starts animation when the Title is 90% in view
  end: "bottom 10%", // Ends animation when the Title is 10% out of view
  onEnterBack: () => {
    mobileStore.fromTo(
      ".mobStore",
      { opacity: 0, y: "50px" },
      { opacity: 1, y: 0 }
    );
  },

  onEnter: () => {
    mobileStore.fromTo(
      ".mobStore",
      { opacity: 0, y: "50px" },
      { opacity: 1, y: 0 }
    );
  }
});

// Cleanup
return () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Clean up ScrollTriggers
};

  } , [])
  return (
    <div className="w-full px-8 Clip2 bg-gray-800   flex flex-col lg:flex-row justify-between items-center  max-md:px-2 max-md:py mx-auto">
      <div className="w-full lg:w-1/2 relative flex justify-center items-center lg:items-start  ">
        <img
          src="./images/landing_page/Phone.png"
          alt="./images/landing_page/Phone.png"
          className="w-[300px] lg:w-[350px] mx-auto lg:mx-0 md:w-[200px] px-4 "
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-start gap-4 mt-10 lg:mt-0 lg:ml-10 max-md:text-center max-md:w-5/6">
        <span className="text-3xl lg:text-4xl font-bold text-gray-800  max-md:w-full mobStore ">
          The world in your pocket
        </span>
        <span className="text-base lg:text-lg font-bold text-gray-600 max-md:w-full mobStore">
          Access mobile-only deals, view your trip details on the go and search
          hundreds of travel sites with one tap.
        </span>
        <span className="text-lg lg:text-xl font-bold text-gray-800 max-md:w-full mobStore">
          Get the Telefrik app
        </span>
        <div className="flex justify-center lg:justify-start items-start gap-4 max-md:flex-col max-md:items-center max-md:py-10 max-md:w-full ">
          <button className="w-36 lg:w-52 h-12 lg:h-14 rounded-md bg-gray-800 text-white max-md:w-full flex justify-center items-center gap-2 mobStore">
            <IoLogoApple size={24} />
            <span>IOS</span>
          </button>
          <button className="w-36 lg:w-52 h-12 lg:h-14 rounded-md bg-gray-800 text-white max-md:w-full flex justify-center items-center gap-2 mobStore">
            <IoLogoAndroid size={24} />
            <span>Android</span>
          </button>
        </div>
      </div>
    </div>
  );
};
