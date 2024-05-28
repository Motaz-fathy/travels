import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer";
import { FaPhone, FaComment } from "react-icons/fa";
import { MdMail } from 'react-icons/md';
import { toast, ToastContainer } from "react-toastify";
import {contactAction} from '../../redux/actions/profile/profile_actions'
import {useDispatch , useSelector} from 'react-redux'
import {LOAD_CONTACT} from '../../redux/actions/types'
import { FaSpinner } from 'react-icons/fa';

export const ContactUs = () => {

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const dispatch = useDispatch()
  const {contactMessage , contactLoading , contactError } = useSelector(state => state.contactReducer)
  const loginReducer = useSelector(state => state.LoginReducer);
  const data = loginReducer.data.data;
  const handleContactForm = (e) => {
    setContactForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Full name validation
    const nameParts = contactForm.name.trim().split(" ");
    if (nameParts.length < 2) {
      toast.error("Full name must be at least two words");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    // Phone number validation
    const phoneRegex = /^(10|11|12|15)\d{8}$/;
    if (!phoneRegex.test(contactForm.phone)) {
      toast.error("Phone number must start with 10, 11, 12, or 15 and be 11 digits long");
      return;
    }

    // Message validation
    if (contactForm.message.length < 20) {
      toast.error("Message must be at least 20 characters long");
      return;
    }
    await dispatch({type : LOAD_CONTACT})
    await dispatch(contactAction(data.api_token , contactForm))
   

    // Proceed with form submission logic
    // e.g., send form data to backend, etc.
  }

  useEffect(() => {
      if(!contactLoading && contactMessage){
        toast.success(contactMessage)
        setContactForm({
          name: "",
          email: "",
          phone: "",
          message: ""
        })
      }
  } , [contactMessage , contactError , contactLoading])

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

          <div className="flex justify-center items-start gap-4 max-md:flex-col w-full">
            {/* info content */}
            <div className="lg:mb-0 w-2/5 max-md:w-full ">
              <div className="w-full h-full flex flex-col items-start gap-12 ">
                <div className="w-full Clip h-auto rounded-xl bg-gray-800 flex flex-col items-start p-4 text-gray-200 gap-6">
                  <div className="flex justify-start items-center gap-2 ">
                    <span className="p-2 bg-gray-200 rounded-md text-gray-800">
                      <FaPhone color="" />
                    </span>
                    <span>Call Us Directly At</span>
                  </div>
                  <span className="text-2xl">+20 1063626268</span>
                  <div className="w-full flex justify-center items-center ">
                    <span className="w-2/3 h-10 p-2 rounded-full text-center bg-gray-600 cursor-pointer">
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
                  <div className="w-full flex justify-center items-center ">
                    <span className="w-2/3 h-10 rounded-full text-gray-200 bg-gray-800 flex justify-center items-center cursor-pointer"> Contact Us</span>
                  </div>
                </div>
              </div>
            </div>
            {/* form content */}
            <form className="w-2/5 max-md:w-full p-5" onSubmit={handleSubmit}>
              <input
                type="text"
                className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 my-2 px-4 rounded-full border border-gray-200 focus:outline-none "
                placeholder="Full Name"
                onChange={handleContactForm}
                name="name"
              />
              <input
                type="text"
                className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 my-2 px-4 rounded-full border border-gray-200 focus:outline-none "
                placeholder="Email"
                onChange={handleContactForm}
                name="email"
              />
              <input
                type="text"
                className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 my-2 px-4 rounded-full border border-gray-200 focus:outline-none "
                placeholder="1021882535"
                onChange={handleContactForm}
                name="phone"
              />

              <textarea
                type="text"
                className="w-full h-32 text-gray-600 placeholder-gray-400 bg-transparent text-lg shadow-sm font-normal leading-7 my-2 px-4 rounded-xl py-5 border border-gray-200 focus:outline-none "
                placeholder="Message"
                onChange={handleContactForm}
                name="message"
              />
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 h-12 text-white text-base font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-gray-900 bg-gray-800 shadow-sm">
                <span>Send</span>  {contactLoading && <FaSpinner />}
              </button>

            </form>
          </div>
        </div>
      </section>
      {/* footer  */}
      <div className="w-full ">
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};
