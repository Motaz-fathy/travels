import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bus } from './Bus';
import {
  AvilableSeats,
  CreateTicketAction,
  search_bus_trip,
  CreateReturnTicketAction,
  StoreFirstTicketDataAction
} from "../../redux/actions/bus_travel_actions/bus_travel_actions";

import { Footer } from "../../components/Footer";
import { BusHeader } from "./BusHeader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Navbar } from "../../components/Navbar/Navbar";
import { nextStep } from "../../redux/actions/Ui/UiActions";
import { Stepper } from "../../sheard/stepper";

export const BookingChaireRoundTrip = () => {

  // Redux hooks
  const { trip, loading } = useSelector(state => state.SingleTrip);
  const { seats } = useSelector(state => state.AvilableSeatsReducer);
  const { endDate } = useSelector(state => state.StoreEndDateReduce);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeStep } = useSelector(state => state.stepReducer);
  const [selectedList, setSelectedList] = useState({});




  const filterSelectedSeats = useMemo(() => {
    return seats.filter(seat => selectedList.hasOwnProperty(`seat_${seat.id}`));
  }, [seats, selectedList]);

  const reservationSeats = useMemo(() => {
    return filterSelectedSeats.map(item => ({
      seat_type_id: item.seat_type_id,
      seat_id: item.id
    }));
  }, [filterSelectedSeats]);


  useEffect(() => {
    if (trip) {
      dispatch(AvilableSeats(trip));
    }
  }, [dispatch, trip]);

  const LoginReducer = useSelector(state => state.LoginReducer);
  const { firstTicketData } = useSelector(state => state.StoreFirstTicketDate);
  const { reservationReturnTicket, ReturnError } = useSelector(state => state.CreateReturnTicketReducer);
  let token = null;

  // create first ticket 
  const SearchTripAndCreateFirstTicket = async () => {
    token = LoginReducer?.data?.data?.api_token || null;
    const firstTicket = activeStep === 1 &&  reservationSeats.length !== 0 && trip !== null && {
      "trip_id": trip.id,
      "from_city_id": trip.cities_from[0].id,
      "to_city_id": trip.cities_to[0].id,
      "from_location_id": trip.stations_from[0].id,
      "to_location_id": trip.stations_to[0].id,
      "date": trip.date,
      "seats": reservationSeats
    }

    if (token === null) {
      navigate("/login");
      toast.dismiss("you can't access before login in please");
    } else if ( reservationSeats.length !== 0 ) {
      await navigate(-1);
      dispatch(nextStep());
      dispatch(search_bus_trip(trip.cities_to[0].id, trip.cities_from[0].id, endDate));
      dispatch(StoreFirstTicketDataAction(firstTicket));
     
    }

    
  };

  // create return ticket 
  const SubmitCreateTicket = async () => {
    token = LoginReducer?.data?.data?.api_token || null;

    const ReturnTicketDate = activeStep === 3 && firstTicketData &&  reservationSeats.length !== 0  && trip !== null &&  {
      "round" : 2 , 
       "boarding" : firstTicketData ,
      "return" : {
        "trip_id": trip.id,
        "from_city_id": trip.cities_from[0].id,
        "to_city_id": trip.cities_to[0].id,
        "from_location_id": trip.stations_from[0].id,
        "to_location_id": trip.stations_to[0].id,
        "date": endDate,
        "seats": reservationSeats
      }
    };

    if (token === null) {
      navigate("/login");
      toast.dismiss("you can't access before login in please");
    } else if (reservationSeats.length !== 0  ) {
      
      dispatch(CreateReturnTicketAction(ReturnTicketDate, token));
      if (ReturnError) {
        toast.error(ReturnError);
      }
      if (reservationReturnTicket) {
        toast.success("create return ticket success");
        navigate('reservation-ticket')
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-0 w-full">
      <Navbar />
      <BusHeader trip={trip} />
      <Stepper />

      <div className="flex justify-center gap-6 items-start w-full px-8 max-md:flex-col">
        <Bus
          seats={seats}
          setSelectedList={setSelectedList}
          selectedList={selectedList}
          reservationSeats={reservationSeats}
          filterSelectedSeats={filterSelectedSeats}
          trip={trip}
          category={trip.bus.category}
        />

        <div className="lg:w-2/3 bg-gray-800 max-md:w-full shadow-xl my-2 Clip h-auto flex flex-col items-center gap-4 py-8 -rotate-2 border-8 border-yellow-400">
          <span className="text-2xl text-gray-200 font-bold">
            Please select seat{" "}
          </span>
          <span className="w-1/3 max-sm:w-2/3 bg-yellow-400 h-2 mx-auto -rotate-2 mb-5 rounded-full" />
          {reservationSeats.length !== 0 &&
            reservationSeats.map((item, index) => {
              return (
                <div
                  className="w-full px-4 flex justify-between items-center"
                  key={index}
                >
                  <div className="flex justify-center items-center gap-2">
                    <span className="seat selected" />
                    <span className="text-white font-bold text-xl">
                      {item.seat_id}
                    </span>
                  </div>
                  <div className="text-white">
                    {trip.price_start_with} LE{" "}
                  </div>
                </div>
              );
            })}

     

          <span className="text-2xl font-bold text-white">
            Total price : {reservationSeats.length !== 0 && reservationSeats.length * trip.price_start_with}  LE
          </span>

          {activeStep === 1 &&
            <button className="w-2/3 py-2 bg-gray-200 rounded-md hover:bg-white" onClick={SearchTripAndCreateFirstTicket}>
              {" "} booking and search  {" "}
            </button>
          }

          {activeStep === 3 &&
            <button className="w-2/3 py-2 bg-gray-200 rounded-md hover:bg-white" onClick={SubmitCreateTicket}>
              {" "}checkout {" "}
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
