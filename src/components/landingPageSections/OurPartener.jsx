import React, { useEffect } from "react";
import Slider from "../../sheard/Slider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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


  const logos = [
    {
      src: "image 2.png"
    },
    {
      src: "image 3.png"
    },
    {
      src: "image 4.png"
    },
    {
      src: "image 5.png"
    },
    {
      src: "image 6 (1).png"
    },
    {
      src: "image 7.png"
    },
    {
      src: "image 8.png"
    }
  ];


  return (
    <div className=" w-full mx-auto flex flex-col items-center gap-4 mt-24 py-20">
      <span className="text-4xl font-bold text-gray-800 our">Our partner</span>
      <span className="text-lg font-bold text-gray-600 px-2 w-4/5 max-md:w-full max-md:px-2 mx-auto text-center our">
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
              <img
                src={`./images/ourParent/${item.src}`}
                alt={item.src}
                key={index}
                className="   rounded-lg shadow-lg  backdrop-filter backdrop-blur-lg p-2 w-30 h-30 "
              />
               
            );
          })}
        </Slider>
      </div>
    </div>
  );
};
