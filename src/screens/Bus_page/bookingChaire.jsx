import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BusinessBus } from '../../sheard/buses/businessBus';
import { AvilableSeats } from '../../redux/actions/bus_travel_actions/bus_travel_actions';

export const BookingChaire = () => {
  // Redux hooks
  const { trip, loading } = useSelector(state => state.SingleTrip);
  const { seats } = useSelector(state => state.AvilableSeatsReducer);
  const dispatch = useDispatch();

  // Local state for selected seats
  const [selectedList, setSelectedList] = useState({});

  // Fetch available seats when trip and loading status change
  useEffect(() => {
    if (!loading && trip) {
      dispatch(AvilableSeats(trip));
    }
  }, [loading, trip, dispatch]);

  // Function to filter selected seats
  const filterSelectedSeats = useMemo(() => {
    return seats.filter(seat => selectedList.hasOwnProperty(`seat_${seat.id}`));
  }, [seats, selectedList]);

  // Mapping filtered seats for reservation
  const reservationSeats = useMemo(() => {
    return filterSelectedSeats.map(item => ({
      seat_type_id: item.seat_type_id,
      seat_id: item.id
    }));
  }, [filterSelectedSeats]);

  // Logging selected seats for reservation
  console.log("reservationSeats", reservationSeats);

  return (
    <div>
      {seats.length !== 0 && (
        <BusinessBus
          seats={seats}
          setSelectedList={setSelectedList}
          selectedList={selectedList}
        />
      )}
    </div>
  );
};
