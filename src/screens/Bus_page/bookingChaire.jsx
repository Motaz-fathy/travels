import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BusinessBus } from "../../sheard/buses/businessBus";
import { AvilableSeats } from "../../redux/actions/bus_travel_actions/bus_travel_actions";
import { ClassicBus } from "../../sheard/buses/ClassicBus";
import { ComfortBus } from "../../sheard/buses/ComfortBus";
import { EconomyBus } from "../../sheard/buses/EconomyBus";
import { PrimeBus } from "../../sheard/buses/PrimeBus";
import {Footer} from '../../components/Footer'
import { BusHeader } from "./BusHeader";
export const BookingChaire = () => {
  // Redux hooks
  const { trip, loading } = useSelector(state => state.SingleTrip);
  const { seats } = useSelector(state => state.AvilableSeatsReducer);
  const dispatch = useDispatch();

  // Local state for selected seats
  const [selectedList, setSelectedList] = useState({});

  // Fetch available seats when trip and loading status change
  useEffect(() => {
    dispatch(AvilableSeats(trip));
  }, [dispatch , trip ]);

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

  // Logging selected seats for reservation
  console.log("reservationSeats", reservationSeats);
  console.log(trip)
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <BusHeader trip={trip} />
      <div className="flex justify-center gap-6 items-start w-full px-8 max-md:flex-col">
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

          <div className="lg:w-2/3 bg-gray-800 max-md:w-full  shadow-xl my-2 Clip h-auto flex flex-col items-center gap-4 py-8 -rotate-2 border-8 border-yellow-400 ">
            <span className="text-2xl text-gray-200 font-bold" >Please select seat </span> 
            <span className="w-1/3 max-sm:w-2/3 bg-yellow-400 h-2 mx-auto -rotate-2 mb-5 rounded-full" />
                {reservationSeats.length !== 0 && reservationSeats.map((item , index) => {
                  return  <div className="w-full px-4 flex justify-between items-center " key={index}>
                            <div className="  flex justify-center items-center gap-2">
                              <span className="seat selected"></span>
                             <span className="text-white font-bold text-xl">{item.seat_id}</span>
                            </div>
                            <div className="text-white">{trip.price_start_with} LE </div>
                          </div>
                })}
             <span className="text-2xl font-bold text-white">Total price : {reservationSeats.length * trip.price_start_with } LE</span>
             <button className="w-2/3 py-2 bg-gray-200  rounded-md hover:bg-white  "> checkout </button>
          </div>
      </div>
      <div className="w-full">
      <Footer />
      </div>
      
    </div>
  );
};
