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
import { Stepper } from "../../sheard/stepper";

export const Layout = () => {
  const { data , loading } = useSelector(state => state.busSearch);
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
    trips?.flatMap(trip => [
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
           <Stepper />
          <span>result : {modifiyTrips.length}</span>
        </div>
        <br />
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
