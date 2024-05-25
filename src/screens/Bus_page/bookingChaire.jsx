import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BusinessBus } from "../../sheard/buses/businessBus";
import {
  AvilableSeats,
  CreateTicketAction,
  search_bus_trip
} from "../../redux/actions/bus_travel_actions/bus_travel_actions";
import { ClassicBus } from "../../sheard/buses/ClassicBus";
import { ComfortBus } from "../../sheard/buses/ComfortBus";
import { EconomyBus } from "../../sheard/buses/EconomyBus";
import { PrimeBus } from "../../sheard/buses/PrimeBus";
import { Footer } from "../../components/Footer";
import { BusHeader } from "./BusHeader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Navbar } from "../../components/Navbar/Navbar";
import { Stepper } from "../../sheard/stepper";
export const BookingChaire = () => {
  // Redux hooks
  const { trip, loading } = useSelector(state => state.SingleTrip);
  const { seats } = useSelector(state => state.AvilableSeatsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {tripType} = useSelector(state => state.tripReducer)
  const [typeTripCondition , setTypeTripCondition] = useState(1)
  const {searchData} = useSelector(state => state.StoreSearchDataReduce)

  // Local state for selected seats
  const [selectedList, setSelectedList] = useState({});

  // Fetch available seats when trip and loading status change
  useEffect(
    () => {
      dispatch(AvilableSeats(trip));
      if(tripType === "round"){
           setTypeTripCondition(2)
      }
    },
    [dispatch, trip , tripType]
  );

  // Function to filter selected seats
  const filterSelectedSeats = useMemo(
    () => {
      return seats.filter(seat =>
        selectedList.hasOwnProperty(`seat_${seat.id}`)
      );
    },
    [seats, selectedList]
  );

  // Mapping filtered seats for reservation
  const reservationSeats = useMemo(
    () => {
      return filterSelectedSeats.map(item => ({
        seat_type_id: item.seat_type_id,
        seat_id: item.id
      }));
    },
    [filterSelectedSeats]
  );



  const LoginReducer = useSelector(state => state.LoginReducer);
  const { reservationTicket, error } = useSelector(
    state => state.CreateTicketReducer
  );
  let token = null;

  const SubmitCreateTicket = () => {

    token  = LoginReducer?.data?.data?.api_token || null 

    const ticketData = {
      "round": 1,
      "boarding": {
        "trip_id": trip.id ,
        "from_city_id": searchData.city_from,
        "to_city_id": searchData.city_to,
        "from_location_id": trip.stations_from[0].id,
        "to_location_id": trip.stations_to[0].id,
        "date": trip.date,
        "seats": reservationSeats
      }

    }

     if(token === null){
        navigate("/login")
        toast.dismiss("you can't access before login in please")
      } else if (reservationSeats.length !== 0 ) {
        
          dispatch(CreateTicketAction(ticketData , token ))
          if(error !== null ) {
            toast.error(error);
          }
      }
      
      if(!!reservationTicket){
        toast.success(" create ticket success ")
      }
     
  };



  return (
    <div className="flex flex-col items-center gap-0 w-full bg-gray-200 ">
      <Navbar />
      <BusHeader trip={trip} />
      <Stepper />
      <div className="flex justify-center gap-6 items-start w-full px-8 max-md:flex-col my-10">
        {trip.bus.category === "Business 40" &&
          <BusinessBus
            seats={seats}
            setSelectedList={setSelectedList}
            selectedList={selectedList}
            reservationSeats={reservationSeats}
            filterSelectedSeats={filterSelectedSeats}
            trip={trip}
          />}
        {trip.bus.category === "Classic" &&
          <ClassicBus
            seats={seats}
            setSelectedList={setSelectedList}
            selectedList={selectedList}
            reservationSeats={reservationSeats}
            filterSelectedSeats={filterSelectedSeats}
            trip={trip}
          />}
        {trip.bus.category === "Comfort" &&
          <ComfortBus
            seats={seats}
            setSelectedList={setSelectedList}
            selectedList={selectedList}
            reservationSeats={reservationSeats}
            filterSelectedSeats={filterSelectedSeats}
            trip={trip}
          />}
        {trip.bus.category === "Economy" &&
          <EconomyBus
            seats={seats}
            setSelectedList={setSelectedList}
            selectedList={selectedList}
            reservationSeats={reservationSeats}
            filterSelectedSeats={filterSelectedSeats}
            trip={trip}
          />}
        {trip.bus.category === "Prime_Mix" &&
          <PrimeBus
            seats={seats}
            setSelectedList={setSelectedList}
            selectedList={selectedList}
            reservationSeats={reservationSeats}
            filterSelectedSeats={filterSelectedSeats}
            trip={trip}
          />}

        <div className="lg:w-2/3 bg-gray-100 max-md:w-full   my-2  h-auto flex flex-col items-center gap-4 py-8   shadow-xl rounded-xl ">
          <span className="text-2xl text-gray-800 font-bold">
            Please select seat{" "}
          </span>
          <span className="w-1/3 max-sm:w-2/3 bg-gray-800 h-2 mx-auto -rotate-2 mb-5 rounded-full" />
          {reservationSeats.length !== 0 &&
            reservationSeats.map((item, index) => {
              return (
                <div
                  className="w-full px-4 flex justify-between items-center "
                  key={index}
                >
                  <div className="  flex justify-center items-center gap-2">
                    <span className="seat selected" />
                    <span className="text-gray-800 font-bold text-xl">
                      {item.seat_id}
                    </span>
                  </div>
                  <div className="text-gray-800">
                    {trip.price_start_with} LE{" "}
                  </div>
                </div>
              );
            })}
          <span className="text-2xl font-bold text-gray-800">
            Total price : {reservationSeats.length * trip.price_start_with} LE
          </span>
          {typeTripCondition === 1 && 
          <button className="w-2/3 py-2 bg-gray-900  hover:bg-gray-800  rounded-md transition-all duration-300 text-gray-200  " onClick={SubmitCreateTicket}>
            {" "}checkout{" "}
          </button>   
          }





        </div>

      </div>

      <div className="w-full">
        <Footer />
      </div>

      <ToastContainer />
    </div>
  );
};
