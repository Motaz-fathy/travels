import React, { useState, useEffect } from "react";
import { LoginAction } from "../../redux/actions/user/User";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {Navbar} from '../../components/Navbar/Navbar'
import {Footer} from '../../components/Footer'
import { FaSpinner } from 'react-icons/fa';
export const Login = () => {
  const dispatch = useDispatch();
  const { data, error , loading } = useSelector((state) => state.LoginReducer); // get res data after LoginAction dispatched

  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [countryCode, setCountryCode] = useState("+20"); // Default country code
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit is success ");
    // Validate phone number and password
    dispatch(LoginAction("20", phoneNumber, password));
  };

  useEffect(() => {
    // Navigate to /otp if data.need_verification is true
    if (data?.need_verfication === true && data.status === 200) {
      window.localStorage.setItem("phoneNumber", phoneNumber);
      navigate("/otp");
    } else if (data?.data !== undefined) {
      navigate(from); // Navigate to the last attempted URL
    }
  }, [data, navigate, phoneNumber, from]);

  return (
    <div className="min-h-screen flex items-center flex-col bg-gray-200 ">
      <Navbar />
      <div className="max-w-md w-full space-y-8 py-40 px-4 sm:px-6 lg:px-8 ">
        <div>
          <img src={`${process.env.PUBLIC_URL}/images/login_logo.png`} alt="login_logo.png" className="mx-auto"/>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {error !== null && (
          <div className="text-center text-lg font-extrabold text-red-600">
            {error.credentials}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="flex">
              <div className="relative w-28 ">
                <select
                  id="country-code"
                  name="country-code"
                  className="block appearance-none w-full bg-gray-200 px-4 py-2 pr-8 rounded-none shadow-sm leading-tight focus:outline-none"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <option value="+20">+20</option>
                  {/* Add other country codes as options */}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-800">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M10 3a7 7 0 100 14 7 7 0 000-14zM3 10a7 7 0 1114 0 7 7 0 01-14 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <input
                id="phone-number"
                name="phone-number"
                type="tel"
                autoComplete="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-gray-800 focus:border-gray-800 focus:z-10 sm:text-sm"
                placeholder="1021882535"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-200 focus:border-gray-200 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all duration-300"
            >
              <span>Sign in</span> {loading && <FaSpinner />}
            </button>
          </div>
          <Link to={'/register'} className=" w-full text-center py-8 text-sky-800 "> <span className="">I dont have an account  </span> </Link>
        </form>
        
      </div>
      <ToastContainer />
       <div className="w-full">
        <Footer />
       </div>
    </div>
  );
};
