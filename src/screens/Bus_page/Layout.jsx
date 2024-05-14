import React, { useEffect, useRef, useState } from "react";
import { SaidBar } from "./SaidBar";
import { BusNavbar } from "./BusNavbar";
import { Container } from "./Container";
import gsap from "gsap";
import { useSelector } from "react-redux";
import { FilterTrips } from "../../utils/filterTripsByArrivalTime";
import {Footer} from '../../components/Footer'
import { ToastContainer } from "react-toastify";
import { BusHeader } from "./BusHeader";
import { Navbar } from "../../components/Navbar/Navbar";

export const Layout = () => {
  const { data, loading } = useSelector(state => state.busSearch);
  const trips = data.data;
  const error = data.errors;
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [saidCtr, setSaidCtr] = useState(false);

  const handleSaidbar = () => {
    setSaidCtr(prev => !prev);
  };
  // Flatten trips for easier filtering
  let allTrips = []
  if(loading === false ) {
     allTrips = 
    trips.flatMap(trip => [
      trip,
      ...trip.stations_from.map(station => ({
        ...trip,
        stations_from: [station]
      })),
      ...trip.stations_to.map(station => ({ ...trip, stations_to: [station] }))
    ]) || [];
  }
  // handle flating trips in useEffect hooks 



  const [modifiyTrips, setModifiyTrips] = useState([]);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = event => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(
    () => {
      if (isOpen === true) {
        gsap.from(".filter", {
          y: "-20px",
          opacity: 0,
          duration: 0.5
        });

        gsap.to(".filter", {
          y: 0,
          opacity: 1,
          duration: 0.5
        });
      }
    },
    [isOpen]
  );

  // Pagination logic
  const tripsPerPage = 10;
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = modifiyTrips.slice(indexOfFirstTrip, indexOfLastTrip);
  const [showSidebar, setShowSidebar] = useState(true);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
  <div className="w-full flex flex-col items-center  ">
    <Navbar />
    <BusHeader 
    trip ={currentTrips[0]}
    />
    <div className="  w-full  flex justify-between items-start max-md:flex-col ">
      {/*  said bar  */}

      <div
        className={`w-1/4 max-md:w-full`}
      >
        <FilterTrips
          setModifiyTrips={setModifiyTrips}
          isOpen={isOpen}
          trips={allTrips}
          setSaidCtr={setSaidCtr}
          loading={loading}
        />
      </div>

      <div
        className={`  w-3/4  flex flex-col items-start gap-2 max-md:w-full `}
      >
        {/* navbar */}
        <div className="w-full h-14  flex justify-between items-center px-4">
          <span
            className="px-2 py-2 cursor-pointer flex justify-center items-center gap-2 rounded-xl text-gray-800 hover:text-gray-600"
            onClick={handleSaidbar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            <span className="">filters</span>
          </span>
          <span>result : {modifiyTrips.length}</span>
        </div>

        {/* trips container  */}
        <div className="w-full   ">
          <Container
            currentTrips={currentTrips}
            loading={loading}
            currentPage={currentPage}
            paginate={paginate}
            tripsPerPage={tripsPerPage}
          />
        </div>

        {/* footer  */}
     
        
      </div>
    
    </div>
    <div className="w-full">
    <Footer />
    </div>
    <ToastContainer />
  </div>
  );
};
