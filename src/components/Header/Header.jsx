import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CSSPlugin } from "gsap/CSSPlugin";
import { Menu_cards } from "../menu_cards/Menu_cards";
import { Navigation_search } from "../Hero_screach/Navigation_search";
export const Header = () => {
  gsap.registerPlugin(CSSPlugin);
  const [open_menu, set_open_menu] = useState(false);

  const handle_menu = () => {
    set_open_menu(!open_menu);
  };



  useEffect(
    () => {
      if (!open_menu) {
        gsap.to(".menu", { x: "100%", duration: 0.3 });
        gsap.to(".head_trip" , { x: "50%" , duration: 0.5 })
      } else {
        gsap.to(".menu", { x: 0, duration: 0.5 });
        gsap.to(".head_trip" , { x: 0 , duration: 0.5 , delay: 0.1})

      }
    },
    [open_menu]
  );

  return (
    <div className="relative top-0 left-0 right-0 w-full min-h-screen bg-slate-400 px-8  max-sm:px-2 overflow-hidden">
      <nav className="w-full h-20  flex justify-between items-center gap-3">
        <div className="w-20 h-20  flex justify-center items-center z-50 cursor-pointer">
          Logo
        </div>
        <div className="flex justify-center items-center gap-3 z-50">
          <Link className="cursor-pointer" to={"/"}>Home</Link>
          <Link className="cursor-pointer" to={"/about"}>About</Link>
          <Link className="cursor-pointer" to={"/services"}>services</Link>
        </div>
        <div className="z-50 cursor-pointer" onClick={handle_menu}>
          menu
        </div>
        <div
          className={`absolute top-0 left-0 right-0 w-full min-h-auto py-32 bg-gray-900 flex flex-col   z-20 menu ${open_menu &&
            "open" }`}
        >
          <h1 className="px-8 my-4 text-4xl font-bold text-gray-200 head_trip">popral trips : </h1>  
          <Menu_cards open_menu={open_menu}/>

        </div>
      </nav>

      <Navigation_search />
    </div>
  );
};
