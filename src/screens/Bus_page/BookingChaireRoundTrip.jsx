import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bus } from './Bus';
import {
  AvilableSeats,
  search_bus_trip,
  CreateReturnTicketAction,
  StoreFirstTicketDataAction,
} from "../../redux/actions/bus_travel_actions/bus_travel_actions";
import { Footer } from "../../components/Footer";
import { BusHeader } from "./BusHeader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Navbar } from "../../components/Navbar/Navbar";
import { nextStep } from "../../redux/actions/Ui/UiActions";
import { Stepper } from "../../sheard/stepper";
import { FaSpinner } from "react-icons/fa";

export const BookingChaireRoundTrip = () => {
  // Redux hooks
  const { data, loading } = useSelector(state => state.busSearch);
  const { trip } = useSelector(state => state.SingleTrip);
  const { seats } = useSelector(state => state.AvilableSeatsReducer);
  const { searchData } = useSelector(state => state.StoreSearchDataReduce);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeStep } = useSelector(state => state.stepReducer);
  const [selectedList, setSelectedList] = useState({});
  const LoginReducer = useSelector(state => state.LoginReducer);
  const { firstTicketData } = useSelector(state => state.StoreFirstTicketDate);
  const { reservationReturnTicket, ReturnError } = useSelector(state => state.CreateReturnTicketReducer);
  const [attemping, setAttemping] = useState(false);
  
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

  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    if (data.length > 0) {
      setIsDataReady(true);
    }
  }, [data]);

  useEffect(() => {
    if (attemping) {
      if (ReturnError) {
        toast.error(ReturnError);
        setAttemping(false);
      } else if (reservationReturnTicket) {
        toast.success("Create return ticket success");
        navigate('reservation-ticket');
        setAttemping(false);
      }
    }
  }, [attemping, ReturnError, reservationReturnTicket, navigate]);

  const SearchTripAndCreateFirstTicket = async () => {
    const token = LoginReducer?.data?.data?.api_token || null;
    if (token === null) {
      navigate("/login");
      toast.error("You can't access before logging in. Please log in.");
      return;
    }

    if (reservationSeats.length === 0) {
      toast.warning("Please select at least one seat");
      return;
    }

    const firstTicket = {
      "trip_id": trip.id,
      "from_city_id": searchData.city_from,
      "to_city_id": searchData.city_to,
      "from_location_id": trip.stations_from[0].id,
      "to_location_id": trip.stations_to[0].id,
      "date": searchData.startDate,
      "seats": reservationSeats
    };

    await dispatch(search_bus_trip(searchData.city_to, searchData.city_from, searchData.endDate));
    dispatch(StoreFirstTicketDataAction(firstTicket));

    if (isDataReady) {
      dispatch(nextStep());
      navigate(-1);
    } else {
      toast.warning("Error here");
    }
    
  };

  const SubmitCreateTicket = async () => {
    const token = LoginReducer?.data?.data?.api_token || null;

    if (token === null) {
      navigate("/login");
      toast.error("You can't access before logging in. Please log in.");
      return;
    }

    if (reservationSeats.length === 0) {
      toast.warning("Please select at least one seat");
      return;
    }

    const ReturnTicketData = {
      "round": 2,
      "boarding": firstTicketData,
      "return": {
        "trip_id": trip.id,
        "from_city_id": searchData.city_to,
        "to_city_id": searchData.city_from,
        "from_location_id": trip.stations_from[0].id,
        "to_location_id": trip.stations_to[0].id,
        "date": searchData.endDate,
        "seats": reservationSeats
      }
    };

    await dispatch(CreateReturnTicketAction(ReturnTicketData, token));
    setAttemping(true);


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

        <div className="lg:w-2/3 bg-gray-100 max-md:w-full shadow-xl my-2 rounded-xl h-auto flex flex-col items-center gap-4 py-8 ">
          <span className="text-2xl text-gray-800 font-bold">
            Please select seat{" "}
          </span>
          <span className="w-1/3 max-sm:w-2/3 bg-gray-800 h-2 mx-auto -rotate-2 mb-5 rounded-full" />
          {reservationSeats.length > 0 &&
            reservationSeats.map((item, index) => {
              return (
                <div
                  className="w-full px-4 flex justify-between items-center"
                  key={index}
                >
                  <div className="flex justify-center items-center gap-2">
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
            Total price: {reservationSeats.length !== 0 && reservationSeats.length * trip.price_start_with} LE
          </span>

          {activeStep === 1 &&
            <button className="w-2/3 py-2 bg-gray-900  hover:bg-gray-800  rounded-md transition-all duration-300 text-gray-200" onClick={SearchTripAndCreateFirstTicket}>
               <span>booking and search</span> {loading && <FaSpinner className="animate-spin w-5 h-5" />}
            </button>
          }

          {activeStep === 3 &&
            <button className="w-2/3 py-2 bg-gray-900  hover:bg-gray-800  rounded-md transition-all duration-300 text-gray-200" onClick={SubmitCreateTicket}>
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
