import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
export const Footer = () => {
  const widgetMenus = [
    {
      id: "1",
      title: "Discover our services",
      menus: [
        { label: "Flights" },
        { label: "Maritime transport" },
        { label: "Bus" },
        { label: "Cars" }
      ]
    },
    {
      id: "2",
      title: "sources",
      menus: [
        { href: "/terms", label: "terms" },
        { href: "/privacy", label: "privacy" },
        { href: "/faqs", label: "faqs" }
      ]
    },
    {
      id: "4",
      title: "Stay Connected",
      menus: [
        { href: "/contact", label: "contactUs" },
        { href: "/about", label: "whoWeAre" }
      ]
    }
  ];

  const renderWidgetMenuItem = (menu, index) => {
    return (
      <div key={index} className="text-sm">
        <span className=" text-white sm:mt-0 font-[500] text-[19px]">
          {menu.title}
        </span>
        <ul className="space-y-5">
          {menu.menus.map((item, index) =>
            <li key={index} className="mt-3">
              {!!item.href
                ? <Link 
                    key={index}
                    className="text-[10px] text-white sm:text-[12px] "
                    to={item.href}
                  >
                    {item.label}
                  </Link>
                : <p className="text-[10px] text-white sm:text-[12px] ">
                    {item.label}
                  </p>}
            </li>
          )}
        </ul>
        <div />
      </div>
    );
  };

  return (
    <div className="h-fit py-6   text-[#FFFFFF] px-8    bg-gray-800">
      <div className="container gap-y-10 gap-x-5 sm:grid sm:grid-cols-2 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-4 lg:gap-x-10 ">
        <div className=" col-span-2 grid gap-5 sm:grid-cols-4 md:col-span-4 lg:md:col-span-1 lg:relative lg:flex lg:flex-col">
          <div className=" mx-auto  h-[174px] w-[285px] md:col-span-1 lg:absolute lg:top-[-25px]">
            <img src={"./images/newLogo.png"} alt="logo footer" />
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>

      <div className="flex flex-col items-center justify-center gap-4 px-4 py-8">
        <div className="flex justify-center items-center gap-4  icons ">
          <FaFacebook size={30} color="white" />
          <FaTwitter size={30} color="white" />
          <FaInstagram size={30} color="white" />
          <FaLinkedin size={30} color="white" />
        </div>
        <p className="text-sm text-white ">
          Telefrik is part of Booking Holdings Inc., the world leader in online
          travel & related services.
        </p>

        <span>
          ©{"travel"} {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
};
