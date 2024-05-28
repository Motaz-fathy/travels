import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate , Link } from "react-router-dom";
import { RegisterAction } from "../../redux/actions/user/User";
import { ToastContainer , toast } from "react-toastify";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer";

export const Register = () => {
  const [countryCode, setCountryCode] = useState("+20"); // Default country code
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [formError, setFormError] = useState("");

  // Use built hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, loading } = useSelector(state => state.RegisterReducer);

  // Handle submit function
  const handleSubmit = async e => {
    e.preventDefault();
    setFormError("");

    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      setFormError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    await dispatch(RegisterAction(email, phoneNumber, name, password, confirmPassword));


  };
  
  useEffect(() => {
    if (data) {
      toast.success(data.message);
      navigate("/login");
    }

    if (error) {
      setFormError(error.message || "An error occurred. Please try again.");
    }
  }, [data, error, navigate]);

  return (
    <div className="min-h-screen w-full flex items-center flex-col bg-gray-200">
      <Navbar />
      <div className="max-w-md w-full space-y-8 py-40 px-4 sm:px-6 lg:px-8">
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/images/login_logo.png`}
            alt="login_logo.png"
            className="mx-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {formError &&
          <div className="text-center text-lg font-extrabold text-red-600">
            {formError}
          </div>}
        {error &&
          <div className="text-center text-lg font-extrabold text-red-600">
            {error}
          </div>}
        <form
          className="mt-8 space-y-6 flex flex-col items-center gap-2 w-full"
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm space-y-2 w-full">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-gray-800 focus:border-gray-800 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-gray-800 focus:border-gray-800 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="flex">
              <div className="relative w-28">
                <select
                  id="country-code"
                  name="country-code"
                  className="block appearance-none w-full bg-gray-200 px-4 py-2 pr-8 rounded-none shadow-sm leading-tight focus:outline-none"
                  value={countryCode}
                  onChange={e => setCountryCode(e.target.value)}
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
                onChange={e => setPhoneNumber(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-gray-200 focus:border-gray-200 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-200 focus:border-gray-200 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all duration-300"
            >
              <span>Register</span> {loading && <FaSpinner />}
            </button>
          </div>
        </form>
        <Link to={'/login'} className=" w-full text-center py-8 text-sky-800 " >I already have an account !</Link>
      </div>
      <div className="w-full">
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};
