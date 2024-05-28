import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AvilableSeats,
  CreateTicketAction,
  
} from "../../redux/actions/bus_travel_actions/bus_travel_actions";
import { FaSpinner } from "react-icons/fa";
import {LOAD_CREATE_TICKET} from '../../redux/actions/types'
import { Footer } from "../../components/Footer";
import { BusHeader } from "./BusHeader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Navbar } from "../../components/Navbar/Navbar";
import { Stepper } from "../../sheard/stepper";
import { Bus } from "./Bus";

export const BookingChaire = () => {
  const { trip } = useSelector(state => state.SingleTrip);
  const { seats } = useSelector(state => state.AvilableSeatsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tripType } = useSelector(state => state.tripReducer);
  const [typeTripCondition, setTypeTripCondition] = useState(1);
  const { searchData } = useSelector(state => state.StoreSearchDataReduce);
  const [attemping, setAttemping] = useState(false);
  const [selectedList, setSelectedList] = useState({});

  useEffect(() => {
    dispatch(AvilableSeats(trip));
    if (tripType === "round") {
      setTypeTripCondition(2);
    }
  }, [dispatch, trip, tripType]);

  const filterSelectedSeats = useMemo(() => {
    return seats.filter(seat =>
      selectedList.hasOwnProperty(`seat_${seat.id}`)
    );
  }, [seats, selectedList]);

  const reservationSeats = useMemo(() => {
    return filterSelectedSeats.map(item => ({
      seat_type_id: item.seat_type_id,
      seat_id: item.id
    }));
  }, [filterSelectedSeats]);

  const LoginReducer = useSelector(state => state.LoginReducer);
  const { reservationTicket, error, loading } = useSelector(state => state.CreateTicketReducer);

  useEffect(() => {
    if (attemping) {
      if (!loading) {
        if (error !== null) {
          toast.error(error);
        } else if (reservationTicket) {
          toast.success("Create ticket success");
          navigate('reservation-ticket');
          setAttemping(false);
        }
       
      }
    }
  }, [attemping, error, loading, navigate]);

  const SubmitCreateTicket = async () => {
    const token = LoginReducer?.data?.data?.api_token || null;

    if (token === null) {
      navigate("/login");
      toast.error("You can't access before logging in, please");
      return;
    } 
    
    if (reservationSeats.length === 0) {
      toast.error("Please select a seat");
      return;
    }
   
      const ticketData = {
        "round": 1,
        "boarding": {
          "trip_id": trip.id,
          "from_city_id": searchData.city_from,
          "to_city_id": searchData.city_to,
          "from_location_id": trip.stations_from[0].id,
          "to_location_id": trip.stations_to[0].id,
          "date": trip.date,
          "seats": reservationSeats
        }
      };

      setAttemping(true);
      await dispatch({ type: LOAD_CREATE_TICKET });
      await dispatch(CreateTicketAction(ticketData, token));
    
  };

  return (
    <div className="flex flex-col items-center gap-0 w-full bg-gray-200">
      <Navbar />
      <BusHeader trip={trip} />
      <Stepper />
      <div className="flex justify-center gap-6 items-start w-full px-8 max-md:flex-col my-10">
       <Bus
          seats={seats}
          setSelectedList={setSelectedList}
          selectedList={selectedList}
          reservationSeats={reservationSeats}
          filterSelectedSeats={filterSelectedSeats}
          trip={trip}
          category={trip.bus.category}
        />
        <div className="lg:w-2/3 bg-gray-100 max-md:w-full my-2 h-auto flex flex-col items-center gap-4 py-8 shadow-xl rounded-xl">
          <span className="text-2xl text-gray-800 font-bold">
            Please select seat
          </span>
          <span className="w-1/3 max-sm:w-2/3 bg-gray-800 h-2 mx-auto -rotate-2 mb-5 rounded-full" />
          {reservationSeats.length !== 0 &&
            reservationSeats.map((item, index) => (
              <div className="w-full px-4 flex justify-between items-center" key={index}>
                <div className="flex justify-center items-center gap-2">
                  <span className="seat selected" />
                  <span className="text-gray-800 font-bold text-xl">
                    {item.seat_id}
                  </span>
                </div>
                <div className="text-gray-800">
                  {trip.price_start_with} LE
                </div>
              </div>
            ))}
          <span className="text-2xl font-bold text-gray-800">
            Total price: {reservationSeats.length * trip.price_start_with} LE
          </span>
          {typeTripCondition === 1 && (
            <button
              className="w-2/3 py-2 bg-gray-900 flex justify-center items-center gap-2 hover:bg-gray-800 rounded-md transition-all duration-300 text-gray-200"
              onClick={SubmitCreateTicket}
            >
              <span>Checkout</span> {loading && <FaSpinner /> }
            </button>
          )}
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};
