import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer";
import { FaPhone, FaComment   } from "react-icons/fa";
import { MdMail } from 'react-icons/md';
export const ContactUs = () => {
  return (
    <div className="w-full flex flex-col items-center ">
      <Navbar />
      {/* contact section  */}
      <section className="py-10 -rotate-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="w-full flex flex-col items-center mb-10 "> 
            <span className="text-2xl font-bold text-gray-800">Contact Us</span>
            <span className="w-1/4 max-sm:w-1/3 bg-gray-800 h-2 -rotate-2 mb-5 rounded-full " />
             </div>
            
          <div className="flex justify-center items-start  gap-4 max-md:flex-col w-full">
            {/* info content */}
            <div className="lg:mb-0 w-2/5 max-md:w-full ">
              <div className=" w-full h-full flex flex-col items-start gap-12 ">
                <div className="w-full Clip  h-auto rounded-xl bg-gray-800 flex flex-col items-start p-4 text-gray-200 gap-6">
                  <div className="flex justify-start items-center gap-2 ">
                    <span className="p-2 bg-gray-200 rounded-md text-gray-800">
                    <FaPhone color="" />
                    </span>
                    <span>Call Us Directly At</span>
                  </div>
                  <span className="text-2xl">+20 1063626268</span>
                  <div className="w-full flex justify-center items-center ">
                    <span className="w-2/3  h-10 p-2 rounded-full text-center bg-gray-600 cursor-pointer">
                      contact us{" "}
                    </span>
                  </div>
                 
                </div>
                <div className="w-full flex flex-col items-start gap-4">
                <div className="flex justify-start items-center gap-2 ">
                    <FaComment color="#2D2D2D" />
                    <span>chat with our team </span>
                  </div>
                 <div className="flex justify-start items-center gap-2 ">
                 <MdMail color="#2D2D2D" />
                  <span className="text-gray-800">info@safaria.travel</span>
                 </div>
                  <div className="w-full  flex justify-center items-center ">
                    <span className="w-2/3 h-10 rounded-full text-gray-200 bg-gray-800 flex justify-center items-center cursor-pointer"> Contact Us</span>
                  </div>
                </div>
              </div>
            </div>
            {/* form content */}
            <div className="w-2/5 max-md:w-full p-5 ">
             
              <input
                type="text"
                className="w-full h-12 text-gray-600 placeholder-gray-400  shadow-sm bg-transparent text-lg font-normal leading-7 my-2 px-4 rounded-full border border-gray-200 focus:outline-none "
                placeholder="Full Name"
              />
              <input
                type="text"
                className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 my-2 px-4 rounded-full border border-gray-200 focus:outline-none "
                placeholder="Email"
              />
              <input
                type="text"
                className="w-full h-20 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 my-2 px-4 rounded-full border border-gray-200 focus:outline-none "
                placeholder="Phone"
              />

              <textarea
                type="text"
                className="w-full h-32 text-gray-600 placeholder-gray-400 bg-transparent text-lg shadow-sm font-normal leading-7 my-2 px-4 rounded-xl py-5 border border-gray-200 focus:outline-none "
                placeholder="Message"
              />
              <button className="w-full h-12 text-white text-base font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-gray-900 bg-gray-800 shadow-sm">
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* footer  */}
      <div className="w-full ">
        <Footer />
      </div>
    </div>
  );
};
