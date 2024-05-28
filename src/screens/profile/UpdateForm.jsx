import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { updateProfileAction } from "../../redux/actions/user/User";

export const UpdateForm = () => {
  const [countryCode, setCountryCode] = useState("+20"); // Default country code
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [formError, setFormError] = useState("");
  const [avatar, setAvatar] = useState(null);
  const loginReducer = useSelector((state) => state.LoginReducer);
  let token = loginReducer.data.data.api_token || null;
  const dispatch = useDispatch();
  const { loadingUp, messageUp, errorUp } = useSelector(
    (state) => state.updateProfileReducer
  );

  useEffect(() => {
    if (messageUp) {
      toast.success(messageUp);
    }
    if (errorUp) {
      setFormError(errorUp || "An error occurred. Please try again.");
      toast.error(errorUp);
    }
  }, [dispatch, messageUp, errorUp]);

  // Handle update profile
  const handleUpdateProfile = async (e) => {
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

    // Validate avatar
    if (avatar) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(avatar.type)) {
        setFormError("Invalid file type. Only JPEG, PNG, and GIF are allowed.");
        return;
      }
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (avatar.size > maxSize) {
        setFormError("File size too large. Maximum size is 2MB.");
        return;
      }
    }

    // Create FormData to send file
    const formData = new FormData();
    formData.append("email", email);
    formData.append("mobile", phoneNumber);
    formData.append("name", name);
    formData.append("country_code" , 20)
    // if (avatar) {
    //   formData.append("avatar", avatar);
    // }
    formData.append("password", password);
    formData.append("password_confirmation", confirmPassword);

    await dispatch(updateProfileAction(token , formData));
  };

  return (
    <div className="w-full mb-8">
      <form
        className="space-y-6 flex flex-col items-center gap-2 w-full"
        onSubmit={handleUpdateProfile}
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
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
            <label htmlFor="avatar" className="sr-only">
              Avatar
            </label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-gray-800 focus:border-gray-800 focus:z-10 sm:text-sm"
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
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            <span>Update profile</span> {loadingUp && <FaSpinner />}
          </button>
        </div>
        {formError && <p className="text-red-500 text-sm mt-2">{formError}</p>}
      </form>
    </div>
  );
};
