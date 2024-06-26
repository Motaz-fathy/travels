import React, { useEffect, useState } from "react";

export const BusinessBus = ({ setSelectedList , selectedList, seats , reservationSeats , trip , filterSelectedSeats}) => {

  const setContainer = (e) => {
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("occupied")
    ) {
      e.target.classList.toggle("selected");
      const seat = {};
      if (e.target?.id) {
        seat[`seat_${e.target?.id}`] = e.target?.id;
        if (selectedList[`seat_${e.target?.id}`] === undefined) {
          setSelectedList({ ...selectedList, ...seat });
        } else {
          const seats = selectedList;
          delete seats[`seat_${e.target?.id}`];
          setSelectedList({ ...seats });
        }
      }
    }
  };

  const setSelectedSeats = () => {
    const list = [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
      "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
      "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
      "31", "32", "33", "34", "35", "36", "37", "38", "39", "40"
    ];
    list?.forEach(item => {
      const ele = document.getElementById(item);
      const filterSeats = seats?.filter(seat => seat?.id + "" === item);
      if (filterSeats?.length === 0) {
        ele?.classList?.add("occupied");
      } else {
        ele?.classList?.remove("occupied");
      }
    });
  };

  const setOccupiedSeats = () => {
    const list = [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
      "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
      "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
      "31", "32", "33", "34", "35", "36", "37", "38", "39", "40"
    ];
    list.forEach(item => {
      const ele = document.getElementById(item);
      ele?.classList?.add("occupied");
    });
  };

  useEffect(() => {
    if (seats?.length > 0) {
      setSelectedSeats();
    } else {
      setOccupiedSeats();
    }
  }, [JSON.stringify(seats)]);

  return (
    <div className=" max-md:w-full py-2 " >
      <div className="w-full flex justify-between items-center gap-4 max-sm:flex-col max-md:flex-col">
        <div className=" rounded-xl px-4 max-md:px-0  bg-gray-100 shadow-xl  py-4 max-sm:w-full max-md:w-full">


            <ul className="flex justify-center items-center  py-2 gap-4  rounded-md w-5/6 mx-auto">
              <li>
                <div className="seat"></div>
                <small>availableSeat</small>
              </li>
              <li>
                <div className="seat selected"></div>
                <small>ownSelect</small>
              </li>
              <li>
                <div className="seat occupied"></div>
                <small>notAvailable</small>
              </li>
            </ul>

            <div className="" onClick={(e) => setContainer(e)}>
            <div className="row">
								<div className="seat" title={"1"} id={"1"}></div>
								<div className="seat" title={"2"} id={"2"}></div>
								<div className="seat opacity-0"></div>
								<div className="seat" title={"3"} id={"3"}></div>
								<div className="seat" title={"4"} id={"4"}></div>
							</div>
							<div className="row">
								<div className="seat" title={"5"} id={"5"}></div>
								<div className="seat" title={"6"} id={"6"}></div>

								<div className="seat opacity-0"></div>
								<div className="seat" title={"7"} id={"7"}></div>
								<div className="seat" title={"8"} id={"8"}></div>
							</div>
							<div className="row">
								<div className="seat" title={"9"} id={"9"}></div>
								<div className="seat" title={"10"} id={"10"}></div>
								<div className="seat opacity-0"></div>
								<div className="seat" title={"11"} id={"11"}></div>
								<div className="seat" title={"12"} id={"12"}></div>
							</div>
							<div className="row">
								<div className="seat " title={"13"} id={"13"}></div>
								<div className="seat" title={"14"} id={"14"}></div>
								<div className="seat opacity-0"></div>
								<div className="seat" title={"15"} id={"15"}></div>
								<div className="seat" title={"16"} id={"16"}></div>
							</div>
							<div className="row">
								<div className="seat " title={"17"} id={"17"}></div>
								<div className="seat" title={"18"} id={"18"}></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
							</div>
							<div className="row">
								<div className="seat" title={"19"} id={"19"}></div>
								<div className="seat" title={"20"} id={"20"}></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
							</div>
							<div className="row">
								<div className="seat " title={"21"} id={"21"}></div>
								<div className="seat" title={"22"} id={"22"}></div>
								<div className="seat opacity-0"></div>
								<div className="seat" title={"23"} id={"23"}></div>
								<div className="seat" title={"24"} id={"24"}></div>
							</div>
							<div className="row">
								<div className="seat " title={"25"} id={"25"}></div>
								<div className="seat" title={"26"} id={"26"}></div>
								<div className="seat opacity-0"></div>
								<div className="seat" title={"27"} id={"27"}></div>
								<div className="seat" title={"28"} id={"28"}></div>
							</div>
							<div className="row">
								<div className="seat " title={"29"} id={"29"}></div>
								<div className="seat" title={"30"} id={"30"}></div>
								<div className="seat opacity-0"></div>
								<div className="seat" title={"31"} id={"31"}></div>
								<div className="seat" title={"32"} id={"32"}></div>
							</div>
							<div className="row">
								<div className="seat " title={"33"} id={"33"}></div>
								<div className="seat" title={"34"} id={"34"}></div>
								<div className="seat opacity-0"></div>
								<div className="seat" title={"35"} id={"35"}></div>
								<div className="seat" title={"36"} id={"36"}></div>
							</div>
							<div className="row">
								<div className="seat" title={"37"} id={"37"}></div>
								<div className="seat " title={"38"} id={"38"}></div>
								<div className="seat opacity-0"></div>
								<div className="seat " title={"39"} id={"39"}></div>
								<div className="seat" title={"40"} id={"40"}></div>
							</div>
            </div>

        </div> 
        

      </div>



    </div>
  );

};

