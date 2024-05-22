import React, { useEffect } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getTimeString } from "../../utils/getTimeString";
import { FaRegClock } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import {paymentAction} from '../../redux/actions/bus_travel_actions/bus_travel_actions'
import { useNavigate } from "react-router-dom";
export const ReservationTicket = () => {
  const { reservationTicket } = useSelector(state => state.CreateTicketReducer);
  const { reservationReturnTicket } = useSelector(state => state.CreateReturnTicketReducer);
  const { tripType } = useSelector(state => state.tripReducer);
  const {paymentData , loading , error } = useSelector(state => state.paymentReducer)
  const LoginReducer = useSelector(state => state.LoginReducer);
  let token = null 
  token = LoginReducer?.data?.data?.api_token || null;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // handle pay 
  const handlePayment = async  (uuid , token ) => {
    if(token !== null ){
      dispatch(paymentAction(uuid , token))
    } else {
     navigate('/login')
    }
  }

/**
 * to navigate pay link 
 * useEffect(() => {} , [])
 */

  
  // render trips
  const RenderTicket = data => {

    return (
      <div className="w-full flex flex-col items-center">
        {data.trips.length === 1 &&
          <div className="w-full flex flex-col items-center gap-6 ">
            <div className="flex flex-col items-center gap-4 bg-gray-50 h-auto shadow-2xl mx-auto  reservation-ticket rounded-md w-5/6 max-md:w-full px-6 py-10">
              <div className="w-full flex justify-between items-center  ">
                <span className="px-3 bg-gray-800 rounded-full py-1 text-gray-200 ">
                  oneWay
                </span>
                <span className="flex justify-center items-center gap-2">
                  <FaRegClock />{" "}
                  <span>{getTimeString(data.trips[0].date_time)}</span>
                </span>
              </div>
              <div className="w-full flex justify-between items-start px-8">
                <div className="flex justify-start items-center gap-3">
                  <div className="flex flex-col items-center ">
                    <span className="w-3 h-3 rounded-full bg-gray-200 " />
                    <span className="h-40  bg-gray-800 border-2 border-dashed	" />
                    <span className="w-3 h-3 rounded-full bg-gray-200 " />
                  </div>
                  <div className="flex flex-col items-start gap-20">
                    <div className="flex flex-col items-start ">
                      <span>
                        {data.trips[0].station_from.name}
                      </span>
                      <span>
                        {data.trips[0].station_from.arrival_at}
                      </span>
                    </div>

                    <div className="flex flex-col items-start ">
                      <span>
                        {data.trips[0].station_to.name}
                      </span>
                      <span>
                        {data.trips[0].station_to.arrival_at}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={data.trips[0].company_data.avatar}
                    alt={data.trips[0].company_data.avatar}
                    className="w-20 h-16 "
                  />
                  <span className="seat selected " />
                  <span className="text-gray-200 text-xl font-bold">
                    {data.trips[0].tickets.map(seat => {
                      return seat.seat_number;
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full mx-auto px-4  grid grid-cols-2 sm:grid-cols-1 max-md:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2 ">
              <div className="px-2 py-4 bg-gray-100 shadow-md rounded-xl text-center flex flex-col items-center ">
                <span>original tickets totals</span>
                <span>
                  {data.original_tickets_totals}
                </span>
              </div>
              <div className="px-2 py-4 bg-gray-100 shadow-md rounded-xl text-center flex flex-col items-center ">
                <span>discount</span>
                <span>
                  {data.discount}
                </span>
              </div>
              <div className="px-2 py-4 bg-gray-100 shadow-md rounded-xl text-center flex flex-col items-center ">
                <span>payment fees</span>
                <span>
                  {data.payment_fees}
                </span>
              </div>
              <div className="px-2 py-4 text-xl font-bold bg-yellow-400 text-gray-800 shadow-md rounded-xl text-center flex flex-col items-center ">
                <span>total</span>
                <span>
                  {data.total}
                </span>
              </div>
            </div>

            <div onClick={() => handlePayment(data.id , token ) }
             className="lg:w-1/3 max-md:w-2/3 hover:bg-gray-700 transition-all duration-200 rounded-xl bg-gray-800 text-gray-200 px-4 py-4 text-center cursor-pointer  ">
              {" "}pay now{" "}
            </div>
          </div>}
      </div>
    );
  };

  // render outbond and return ticket

  const RenderRoundTicket = (data) => {
    return (
      <div className="w-full flex flex-col items-center gap-4 ">

        {/* second ticket  */}
        <div className="w-full flex flex-col items-center gap-6 ">

          <div className="flex flex-col items-center gap-4 bg-gray-50 h-auto shadow-2xl mx-auto  reservation-ticket rounded-md w-5/6 max-md:w-full px-6 py-10">
            <div className="w-full flex justify-between items-center  ">
              <span className="px-3 bg-gray-800 rounded-full py-1 text-gray-200 ">
                oneWay
              </span>
              <span className="flex justify-center items-center gap-2">
                <FaRegClock />{" "}
                <span>{getTimeString(data.trips[0].date_time)}</span>
              </span>
            </div>
            <div className="w-full flex justify-between items-start px-8">
              <div className="flex justify-start items-center gap-3">
                <div className="flex flex-col items-center ">
                  <span className="w-3 h-3 rounded-full bg-gray-200 " />
                  <span className="h-40  bg-gray-800 border-2 border-dashed	" />
                  <span className="w-3 h-3 rounded-full bg-gray-200 " />
                </div>
                <div className="flex flex-col items-start gap-20">
                  <div className="flex flex-col items-start ">
                    <span>
                      {data.trips[0].station_from.name}
                    </span>
                    <span>
                      {data.trips[0].station_from.arrival_at}
                    </span>
                  </div>

                  <div className="flex flex-col items-start ">
                    <span>
                      {data.trips[0].station_to.name}
                    </span>
                    <span>
                      {data.trips[0].station_to.arrival_at}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img
                  src={data.trips[0].company_data.avatar}
                  alt={data.trips[0].company_data.avatar}
                  className="w-12 h-12 rounded-full"
                />
                <span className="seat selected " />
                <span className="text-gray-200 text-xl font-bold">
                  {data.trips[0].tickets.map(seat => {
                    return seat.seat_number;
                  })}
                </span>
                <span>{data.trips[0].total}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 bg-gray-50 h-auto shadow-2xl mx-auto  reservation-ticket rounded-md w-5/6 max-md:w-full px-6 py-10">
            <div className="w-full flex justify-between items-center  ">
              <span className="px-3 bg-gray-800 rounded-full py-1 text-gray-200 ">
                return
              </span>
              <span className="flex justify-center items-center gap-2">
                <FaRegClock />{" "}
                <span>{getTimeString(data.trips[1].date_time)}</span>
              </span>
            </div>
            <div className="w-full flex justify-between items-start px-8">
              <div className="flex justify-start items-center gap-3">
                <div className="flex flex-col items-center ">
                  <span className="w-3 h-3 rounded-full bg-gray-200 " />
                  <span className="h-40  bg-gray-800 border-2 border-dashed	" />
                  <span className="w-3 h-3 rounded-full bg-gray-200 " />
                </div>
                <div className="flex flex-col items-start gap-20">
                  <div className="flex flex-col items-start ">
                    <span>
                      {data.trips[1].station_from.name}
                    </span>
                    <span>
                      {data.trips[1].station_from.arrival_at}
                    </span>
                  </div>

                  <div className="flex flex-col items-start ">
                    <span>
                      {data.trips[1].station_to.name}
                    </span>
                    <span>
                      {data.trips[1].station_to.arrival_at}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img
                  src={data.trips[1].company_data.avatar}
                  alt={data.trips[1].company_data.avatar}
                  className="w-12 h-12 rounded-full "
                />
                <span className="seat selected " />
                <span className="text-gray-200 text-xl font-bold flex justify-center items-center gap-2">
                  {data.trips[1].tickets.map(seat => {
                    return <span>{seat.seat_number}</span>
                  })}
                </span>
                <span>{data.trips[1].total}</span>
              </div>
            </div>
          </div>

          <div className="w-full mx-auto px-4  grid grid-cols-2 sm:grid-cols-1 max-md:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2 ">
            <div className="px-2 py-4 bg-gray-100 shadow-md rounded-xl text-center flex flex-col items-center ">
              <span>original tickets totals</span>
              <span>
                {data.original_tickets_totals}
              </span>
            </div>
            <div className="px-2 py-4 bg-gray-100 shadow-md rounded-xl text-center flex flex-col items-center ">
              <span>discount</span>
              <span>
                {data.discount}
              </span>
            </div>
            <div className="px-2 py-4 bg-gray-100 shadow-md rounded-xl text-center flex flex-col items-center ">
              <span>payment fees</span>
              <span>
                {data.payment_fees}
              </span>
            </div>
            <div className="px-2 py-4 text-xl font-bold bg-yellow-400 text-gray-800 shadow-md rounded-xl text-center flex flex-col items-center ">
              <span>total</span>
              <span>
                {data.total}
              </span>
            </div>
          </div>

          <div onClick={() => handlePayment(data.id , token ) } 
          className="lg:w-1/3 max-md:w-2/3 hover:bg-gray-700 transition-all duration-200 rounded-xl bg-gray-800 text-gray-200 px-4 py-4 text-center cursor-pointer  ">
            {" "}pay now{" "}
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-200">
      {/* navbar  */}
      <Navbar />
      {/* container of ticket  */}
      <div className="h-auto w-full flex justify-center items-center gap-4 my-12 px-10 max-md:px-4">
        {tripType === "oneWay" && RenderTicket(reservationTicket)}
        {tripType === "round" && RenderRoundTicket(reservationReturnTicket ) }
      </div>
      {/* footer  */}
      <div className="w-full">
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};
