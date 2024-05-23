import React, { useEffect } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { AboutTelefreikSection } from "../../components/landingPageSections/AboutTelefreikSection";
import { Footer } from "../../components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export const About = () => {
  useEffect(() => {
    // inti time line for animation
    const sec1 = gsap.timeline({
      defaults: {
        stagger: 0.2,
        duration: 0.5
      }
    });

    // create for card animation
    ScrollTrigger.create({
      animation: sec1,
      trigger: ".sec1",
      start: "top 90%", // Starts animation when the Title is 90% in view
      end: "bottom 10%", // Ends animation when the Title is 10% out of view
      onEnterBack: () => {
        sec1.fromTo(".sec1", { opacity: 0, y: "50px" }, { opacity: 1, y: 0 });
      },

      onEnter: () => {
        sec1.fromTo(".sec1", { opacity: 0, y: "50px" }, { opacity: 1, y: 0 });
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Clean up ScrollTriggers
    };
  }, []);

  useEffect(() => {
    // inti time line for animation
    const sec2 = gsap.timeline({
      defaults: {
        stagger: 0.2,
        duration: 0.5
      }
    });

    // create for card animation
    ScrollTrigger.create({
      animation: sec2,
      trigger: ".sec2",
      start: "top 90%", // Starts animation when the Title is 90% in view
      end: "bottom 10%", // Ends animation when the Title is 10% out of view
      onEnterBack: () => {
        sec2.fromTo(".sec2", { opacity: 0, y: "50px" }, { opacity: 1, y: 0 });
      },

      onEnter: () => {
        sec2.fromTo(".sec2", { opacity: 0, y: "50px" }, { opacity: 1, y: 0 });
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Clean up ScrollTriggers
    };
  }, []);

  useEffect(() => {
    // inti time line for animation
    const sec3 = gsap.timeline({
      defaults: {
        stagger: 0.2,
        duration: 0.5
      }
    });

    // create for card animation
    ScrollTrigger.create({
      animation: sec3,
      trigger: ".sec3",
      start: "top 90%", // Starts animation when the Title is 90% in view
      end: "bottom 10%", // Ends animation when the Title is 10% out of view
      onEnterBack: () => {
        sec3.fromTo(".sec3", { opacity: 0, y: "50px" }, { opacity: 1, y: 0 });
      },

      onEnter: () => {
        sec3.fromTo(".sec3", { opacity: 0, y: "50px" }, { opacity: 1, y: 0 });
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Clean up ScrollTriggers
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center bg-gray-200">
      <Navbar />

      {/* parent section of about  */}
      <div className="w-full max-md:flex-col  flex py-10 justify-center items-center gap-6 h-auto bg-gradient-to-r from-gray-900 to-gray-700 bg-cover bg-fixed">
        <div className="flex flex-col  items-start w-1/2  max-md:w-5/6">
          <h2 className="text-4xl font-bold text-gray-100 sec1">About Us.</h2>
          <span className="w-1/3 max-sm:w-2/3 bg-yellow-400 h-2 -rotate-2 mb-5 rounded-full sec1" />
          <span className="text-lg text-gray-300 sec1">
            Teleferik is a website and application that simplifies trip planning
            by allowing users to book accommodations seamlessly through our
            platforms. Compare transportation options, prices, dates and reserve
            your entire journey from the comfort of your home.We revolutionize
            travel with an extensive range of transportation means like buses,
            ferries, planes, and private bookings. Partnering with renowned
            companies like Webus, Bluebus, Bulman, and more, Safaria offers
            diverse travel options
          </span>
        </div>
        <img
          src="./images/newlogo.png"
          alt="./images/newlogo.png"
          className="sec1"
        />
      </div>

      {/* second section  */}
      <div className="w-full flex justify-center items-end gap-2 max-md:flex-col px-4 py-10 ">
        <div className="flex flex-col items-center gap-4 ">
          <img
            src="./images/about/Yellow2.png"
            alt="Yellow2.png"
            width={150}
            height={150}
            className="sec2"
          />
          <span className="text-gray-800 w-2/3 sec2">
            Making it easier to experience the travel. Find tickets for flight,
            bus and private car you won't see anywhere else. Check out our
          </span>
          <span className="text-sky-800 sec2">Mobile app</span>
        </div>

        <div className="flex flex-col items-center gap-4 ">
          <img
            src="./images/about/card_flight.png"
            alt="card_flight.png"
            width={500}
            height={500}
            className="sec2"
          />
          <span className="text-gray-800 w-2/3 sec2">
            Making it easier to experience the travel. Find tickets for flight,
            bus and private car you won't see anywhere else. Check out our
          </span>
          <span className="text-sky-800 sec2">Mobile app</span>
        </div>
      </div>

      {/* third section  */}
      <div className="w-5/6 py-10  flex flex-col items-start gap-4 ">
        <span className="text-4xl text-gray-800 sec3">What we do ?</span>
        <span className="text-xl text-gray-600 sec3">
          Telefreik, a pioneering transportation company in Egypt, has emerged
          as a game-changer in the industry. With a comprehensive range of
          services, including buses, ferries, flights, and private trips,
          Telefreik connects cities across the country, making travel convenient
          and hassle-free. In addition to its own services, Telefreik
          collaborates with renowned agents like Webus, Bluebus, Bulman, and
          others, ensuring a vast network and diverse options for travelers.
          Moreover, Telefreik goes beyond transportation by providing digital
          dashboards to empower traditional companies with outdated systems to
          transition into the digital age, revolutionizing the way
          transportation is managed and experienced.
        </span>
      </div>

      {/* fourth section  */}
      <div className="w-5/6 py-10  flex flex-col items-start gap-4 ">
        <span className="text-4xl text-gray-800 sec3">What we do ?</span>
        <span className="text-xl text-gray-600 sec3">
          We at Telefreik aspire to a world filled with the wonder of discovery
          and the comfort of travel. Our vision is to make dreams come true and
          empower your travels in unparalleled style. Immerse yourself in the
          experience of booking your transportation with us, where great
          performance meets ease as our vision is to make every trip an
          exceptional experience. In a fast-moving world, we at Telefreik
          clearly see the future of transportation and urban mobility. Our
          vision is to be the reliable and innovative companion on your journey
          inside and outside Egypt. We strive to transform everyday commutes
          into comfortable and efficient experiences, where you can move
          effortlessly. Join us on our journey to achieve a future that combines
          technology and comfort, to give you an unparalleled transportation
          experience
        </span>
      </div>

      <AboutTelefreikSection />

      <div className="w-full mt-32 max-md:mt-16">
        <Footer />
      </div>
    </div>
  );
};
