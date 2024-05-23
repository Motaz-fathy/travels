import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyOTPAction,
  resendOTPAction
} from "../../redux/actions/user/User";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer";
export const Otp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const { loading, error, data } = useSelector(state => state.otpReducer);
  const [otp, setOtp] = useState(["", "", "", ""]); // Array to store OTP digits
  const inputRefs = useRef([]); // Ref to store input field references

  const handleChange = (index, value) => {
    // Update OTP array with the new value
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus on the next input field
    if (value !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Combine the digits to form the OTP
    const mobile = window.localStorage.getItem("phoneNumber");
    const otpValue = otp.join("");
    // Dispatch action to verify OTP
    dispatch(verifyOTPAction(mobile, "20", otpValue));
  };

  const handleResendOTP = () => {
    // Dispatch action to resend OTP
    const mobile = window.localStorage.getItem("phoneNumber");
    dispatch(resendOTPAction(mobile, "20"));
  };

  useEffect(
    () => {
      if (data && data.status === 200 && data.data.status === "Active") {
        navigate(from); // Navigate to the last attempted URL
      }
    },
    [data, navigate, from]
  );

  return (
    <div className="w-full flex items-center flex-col h-full bg-gray-200 ">
      <Navbar />
      <div className="max-w-md w-full space-y-8 py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Enter OTP
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-center space-x-2">
              {/* Render 4 input fields for OTP */}
              {otp.map((digit, index) =>
                <input
                  key={index}
                  ref={ref => (inputRefs.current[index] = ref)} // Store reference to input field
                  type="text"
                  maxLength="1"
                  className="appearance-none w-16 text-center py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-900"
                  value={digit}
                  onChange={e => handleChange(index, e.target.value)}
                />
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-4 w-full flex gap-2 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all duration-300"
                disabled={loading} // Disable button when loading
              >
                <span>Submit</span> {loading && <FaSpinner />}
              </button>
            </div>
            {error &&
              <p className="text-red-500 text-center">
                {error}
              </p>}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={handleResendOTP}
            >
              Resend OTP
            </span>
          </form>
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};
