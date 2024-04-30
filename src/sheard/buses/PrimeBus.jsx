import React, { useEffect } from "react";

export const PrimeBus = ({ setSelectedList , selectedList, seats , reservationSeats , trip , filterSelectedSeats}) => {
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
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
			"24",
			"25",
			"26",
			"27",
			"28",
			"29",
			"30",
			"31",
			"32",
			"33",
			"34",
			"35",
			"36",
			"37",
			"38",
			"39",
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
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
			"24",
			"25",
			"26",
			"27",
			"28",
			"29",
			"30",
			"31",
			"32",
			"33",
			"34",
			"35",
			"36",
			"37",
			"38",
			"39",
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
    <div className="w-full px-10 py-4 max-sm:px-2 max-md:px-2">
      <div className="w-full flex justify-between items-center gap-4 max-sm:flex-col max-md:flex-col">
        <div className="w-1/3  border border-gray-600 bg-gray-100 py-4 max-sm:w-full max-md:w-full">
          <ul className="flex justify-center items-center px-4 py-2 gap-4  rounded-md w-5/6 mx-auto">
            <li>
              <div className="seat" />
              <small>availableSeat</small>
            </li>
            <li>
              <div className="seat selected" />
              <small>ownSelect</small>
            </li>
            <li>
              <div className="seat occupied" />
              <small>notAvailable</small>
            </li>
          </ul>

          <div className="container" onClick={(e) => setContainer(e)}>
            <div className="row">
              <div className="steering flex " />
              <div className="seat  opacity-0" />
              <div className="seat opacity-0" />
              <div className="seat opacity-0" />
              <div className="seat opacity-0" />
              <div className="seat opacity-0" />
            </div>
            <div className="row">
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"1"}
                id={"1"}
              >
                1
              </div>
              <div className="seat  opacity-0" />
              <div className="seat opacity-0" />
              <div className="seat opacity-0" />
              <div className="seat opacity-0" />
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"2"}
                id={"2"}
              >
                2
              </div>
            </div>
            <div className="row">
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"3"}
                id={"3"}
              >
                3
              </div>

              <div className="seat opacity-0" />
              <div className="seat opacity-0" />
              <div className="seat opacity-0" />
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"4"}
                id={"4"}
              >
                4
              </div>
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"5"}
                id={"5"}
              >
                5
              </div>
            </div>
            <div className="row">
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"6"}
                id={"6"}
              >
                6
              </div>

              <div className="seat opacity-0" />
              <div className="seat opacity-0" />
              <div className="seat opacity-0" />
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"7"}
                id={"7"}
              >
                7
              </div>
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"8"}
                id={"8"}
              >
                8
              </div>
            </div>
            <div className="row">
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"9"}
                id={"9"}
              >
                9
              </div>
              <div className="seat opacity-0" />
              <div className="seat opacity-0" />
              <div className="seat opacity-0" />
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"10"}
                id={"10"}
              >
                10
              </div>
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"11"}
                id={"11"}
              >
                11
              </div>
            </div>
            <div className="row">
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"12"}
                id={"12"}
              >
                12
              </div>
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"13"}
                id={"13"}
              >
                13
              </div>
              <div className="seat opacity-0" />
              <div className="seat opacity-0" />
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"14"}
                id={"14"}
              >
                14
              </div>
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"15"}
                id={"15"}
              >
                15
              </div>
            </div>
            <div className="row">
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"16"}
                id={"16"}
              >
                16
              </div>
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"17"}
                id={"17"}
              >
                17
              </div>
              <div className="seat opacity-0" />
              <div className="seat opacity-0" />
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"18"}
                id={"18"}
              >
                18
              </div>
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"19"}
                id={"19"}
              >
                19
              </div>
            </div>
            <div className="row">
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"20"}
                id={"20"}
              >
                20
              </div>
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"21"}
                id={"21"}
              >
                21
              </div>
              <div className="seat opacity-0" />
              <div className="seat opacity-0" />
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"22"}
                id={"22"}
              >
                22
              </div>
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"23"}
                id={"23"}
              >
                23
              </div>
            </div>
            <div className="row">
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"24"}
                id={"24"}
              >
                24
              </div>
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"25"}
                id={"25"}
              >
                25
              </div>
              <div className="seat opacity-0" />
              <div className="seat opacity-0" />
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"26"}
                id={"26"}
              >
                26
              </div>
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"27"}
                id={"27"}
              >
                27
              </div>
            </div>
            <div className="row">
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"28"}
                id={"28"}
              >
                28
              </div>
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"29"}
                id={"29"}
              >
                29
              </div>
              <div className="seat opacity-0" />
              <div className="seat opacity-0" />
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"30"}
                id={"30"}
              >
                30
              </div>
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"31"}
                id={"31"}
              >
                31
              </div>
            </div>
            <div className="row">
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"32"}
                id={"32"}
              >
                32
              </div>
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"33"}
                id={"33"}
              >
                33
              </div>
              <div className="seat opacity-0" />
              <div className="seat opacity-0" />
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"34"}
                id={"34"}
              >
                34
              </div>
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"35"}
                id={"35"}
              >
                35
              </div>
            </div>
            <div className="row">
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"36"}
                id={"36"}
              >
                36
              </div>
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"37"}
                id={"37"}
              >
                37
              </div>
              <div className="seat opacity-0" />
              <div className="seat opacity-0" />
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"38"}
                id={"38"}
              >
                38
              </div>
              <div
                className="seat flex justify-center items-end text-white  font-[600] text-[14px]"
                title={"39"}
                id={"39"}
              >
                39
              </div>
            </div>
          </div>
        </div>
        <div className=" w-2/3 max-sm:w-full max-md:w-full  border border-gray-600 bg-gray-100 px-4   py-8 sm:px-6 lg:px-8">
          <div>
            <div className="w-full flex flex-col  items-start gap-2 text-md ">
              {filterSelectedSeats.length !== 0
                ? filterSelectedSeats.map((item, index) => {
                    return (
                      <div
                        className="w-full flex justify-between items-center gap-2"
                        key={index}
                      >
                        <div className="flex justify-center items-center gap-2">
                          <img
                            src={trip.company_data.avatar}
                            alt={trip.company_data.avatar}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex flex-col items-start gap-0 ">
                            <span>
                              {trip.company_data.name}
                            </span>
                            <span>
                              {trip.bus.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-start gap-0">
                          <span>
                            seat number : {item.name}
                          </span>
                          <span>
                            seat type : {item.seat_type_name}
                          </span>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                          <span>
                            {item.price} EL
                          </span>

                          <div
                            className="selected seat flex justify-center items-center text-white font-bold text-sm"
                            key={item}
                          >
                            <span className="translate-y-[5px] -translate-x-[2px]">
                              {item.id}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : <span className="py-2 text-xl"> please select seat </span>}
              <span className="py-2 text-xl">
                total price :{" "}
                {trip.price_start_with * filterSelectedSeats.length}
              </span>
            </div>

            <div className="space-y-4 text-center">
              <a
                href="#"
                className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
              >
                View my cart (2)
              </a>

              <a
                href="#"
                className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
              >
                Checkout
              </a>

              <a
                href="#"
                className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
              >
                Continue shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
