import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CSSPlugin } from "gsap/CSSPlugin";
import { Menu_cards } from "../menu_cards/Menu_cards";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/actions/user/User";
import { FaUser } from 'react-icons/fa';

export const Navbar = () => {
  gsap.registerPlugin(CSSPlugin);
  const [open_menu, set_open_menu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handle_menu = () => {
    set_open_menu(!open_menu);
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };
  useEffect(
    () => {
      if (!open_menu) {
        gsap.to(".menu", { x: "100%", duration: 0.3 });
        gsap.to(".head_trip", { x: "50%", duration: 0.5 });
      } else {
        gsap.to(".menu", { x: 0, duration: 0.5 });
        gsap.to(".head_trip", { x: 0, duration: 0.5, delay: 0.1 });
      }
    },
    [open_menu]
  );
  const { data } = useSelector(state => state.otpReducer) || null;
  const loginReducer = useSelector(state => state.LoginReducer) 
  const datafromLogin = loginReducer.data.data === undefined ? null :  loginReducer.data.data 
  return (
    <div className="w-full bg-gray-800 px-4 overflow-hidden">
      <nav className="w-full h-20  flex justify-between items-center gap-3 text-lg  text-white max-md:hidden">
        <div className="w-20 h-20 -translate-y-[8px]  flex justify-center items-center z-50 cursor-pointer">
          <img src={`${process.env.PUBLIC_URL}/images/newLogo.png`} alt="newLogo.png" />
        </div>

        <div className="flex justify-center items-center gap-3 z-50 ">
          <Link className="cursor-pointer link-container" to={"/"}>
            Home
            <div className="line active:line" />
          </Link>
          <Link className="cursor-pointer link-container" to={"/about"}>
            About
            <div className="line " />
          </Link>

          <Link className="cursor-pointer link-container" to={"/contact"}>
            contact us
            <div className="line " />
          </Link>
        </div>

        <div className="flex justify-center items-center gap-4 ">
          {datafromLogin !== null
            ? <button
                className="cursor-pointer link-container z-50"
                onClick={handleLogout}
              >
                logout
                <div className="line active:line" />
              </button>
            : <Link
                className="cursor-pointer link-container z-50"
                to={"/login"}
              >
                login
                <div className="line " />
              </Link>}

          <Link
            to={"/profile"}
            className="w-6 h-6 z-50 rounded-full bg-gray-200 text-gray-800 flex justify-center items-center "
          >
            <FaUser />
          </Link>

          <span className={`z-50 cursor-pointer  `} onClick={handle_menu}>
            <button className="text-white focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    open_menu
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </span>
        </div>

        <div
          className={`absolute inset-0 h-auto  flex flex-col overflow-hidden  z-20 menu ${open_menu === true ? " w-full" :
            " w-0"}`}
        >
          <div className="w-full h-auto flex flex-col items-center gap-4 bg-gray-800  my-20 backdrop-blur-md overflow-hidden">
          <Menu_cards open_menu={open_menu} />

          </div>
        </div>
      </nav>

      {/* mobile navbar */}
      <nav className="max-md:flex justify-between items-center w-full px-4 hidden">
        <div className="w-20 h-20 -translate-y-[8px]  flex justify-center items-center z-50 cursor-pointer">
          <img src={`${process.env.PUBLIC_URL}/images/newLogo.png`} alt="newLogo.png" />
        </div>
        <span className={`z-50 cursor-pointer  `} onClick={handle_menu}>
          <button className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  open_menu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </span>
        <div className={` absolute inset-0 flex flex-col items-start gap-4 bg-gray-800 text-white menu z-40 py-32 px-8 ${open_menu === true ? " w-full" :
            "hidden"}`}>

          <Link className="cursor-pointer link-container" to={"/"}>
            Home
            <div className="line active:line" />
          </Link>
          <Link className="cursor-pointer link-container" to={"/about"}>
            About
            <div className="line " />
          </Link>

          <Link className="cursor-pointer link-container" to={"/contact"}>
            contact us
            <div className="line " />
          </Link>
          {datafromLogin !== undefined
            ? <button
                className="cursor-pointer link-container z-50"
                onClick={handleLogout}
              >
                logout
                <div className="line active:line" />
              </button>
            : <Link
                className="cursor-pointer link-container z-50"
                to={"/login"}
              >
                login
                <div className="line " />
              </Link>}
        </div>
      </nav>
    </div>
  );
};
