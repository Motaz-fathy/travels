import React from "react";
import { ClassicBus } from "../../sheard/buses/ClassicBus";
import { ComfortBus } from "../../sheard/buses/ComfortBus";
import { EconomyBus } from "../../sheard/buses/EconomyBus";
import { PrimeBus } from "../../sheard/buses/PrimeBus";
import { BusinessBus } from "../../sheard/buses/businessBus";

export const Bus = ({
  category,
  seats,
  setSelectedList,
  selectedList,
  reservationSeats,
  filterSelectedSeats,
  trip
}) => {
  return (
    <div>
      {category === "Business 40" &&
        <BusinessBus
          seats={seats}
          setSelectedList={setSelectedList}
          selectedList={selectedList}
          reservationSeats={reservationSeats}
          filterSelectedSeats={filterSelectedSeats}
          trip={trip}
        />}
      {category === "Classic" &&
        <ClassicBus
          seats={seats}
          setSelectedList={setSelectedList}
          selectedList={selectedList}
          reservationSeats={reservationSeats}
          filterSelectedSeats={filterSelectedSeats}
          trip={trip}
        />}
      {category === "Comfort" &&
        <ComfortBus
          seats={seats}
          setSelectedList={setSelectedList}
          selectedList={selectedList}
          reservationSeats={reservationSeats}
          filterSelectedSeats={filterSelectedSeats}
          trip={trip}
        />}
      {category === "Economy" &&
        <EconomyBus
          seats={seats}
          setSelectedList={setSelectedList}
          selectedList={selectedList}
          reservationSeats={reservationSeats}
          filterSelectedSeats={filterSelectedSeats}
          trip={trip}
        />}
      {category === "Prime_Mix" &&
        <PrimeBus
          seats={seats}
          setSelectedList={setSelectedList}
          selectedList={selectedList}
          reservationSeats={reservationSeats}
          filterSelectedSeats={filterSelectedSeats}
          trip={trip}
        />}
    </div>
  );
};
