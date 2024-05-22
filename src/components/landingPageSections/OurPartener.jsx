import React, { useEffect } from "react";
import Slider from "../../sheard/Slider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PartnerLogos } from "../../sheard/PartenerLogos";

gsap.registerPlugin(ScrollTrigger);

export const OurPartener = () => {
  
  useEffect(() => {
    // init timeline 
    const timeOur = gsap.timeline({
      defaults: {
        duration: 0.5,
        stagger: 0.2
      }
    })

     // create for card animation
     ScrollTrigger.create({
      animation: timeOur,
      trigger: ".our",
      start: "top 90%", // Starts animation when the Title is 90% in view
      end: "bottom 10%", // Ends animation when the Title is 10% out of view
      onEnterBack: () => {
        timeOur.fromTo(
          ".our",
          { opacity: 0, y: "50px" },
          { opacity: 1, y: 0 }
        );
      },

      onEnter: () => {
        timeOur.fromTo(
          ".our",
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
    <div className=" w-full mx-auto flex flex-col items-center gap-4 mt-24 py-20 ">
      <span className="text-4xl font-bold text-gray-800 our">Our partner</span>
      <span className="w-1/3 max-sm:w-2/3 bg-gray-800 h-2 mx-auto -rotate-2 mb-5 rounded-full our" />

      <span className="text-lg font-bold text-gray-600 px-2 w-4/5 max-md:w-full max-md:px-2 mx-auto text-center our">
        Our partner is an invaluable ally in our mission to provide exceptional
        products and services to our customers. With their expertise,
        experience, and shared values, they bring a wealth of knowledge and
        resources to our collaboration. Together, we strive to deliver
        innovative solutions that exceed expectations and drive mutual success.
      </span>
      <div className=" w-full  ">
        <PartnerLogos />
      </div>
    </div>
  );
};
