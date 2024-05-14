import React, { useState, useEffect, useRef } from "react";
import Slider from "../sheard/Slider";
// Functional component for filtering trips by arrival, departure time, price, and company
export const FilterTrips = ({
  trips,
  setModifiyTrips,
  loading,
  setSaidCtr
}) => {
  const calculateMinMaxArrivalTime = () => {
    let min = Infinity;
    let max = -Infinity;

    trips.forEach(trip => {
      const tripArrivalTime = new Date(
        trip.stations_to[0].arrival_at
      ).getTime();
      if (tripArrivalTime < min) min = tripArrivalTime;
      if (tripArrivalTime > max) max = tripArrivalTime;
    });

    return { min, max };
  };

  const calculateMinMaxDepartureTime = () => {
    let min = Infinity;
    let max = -Infinity;

    trips.forEach(trip => {
      const tripDepartureTime = new Date(
        trip.stations_from[0].arrival_at
      ).getTime();
      if (tripDepartureTime < min) min = tripDepartureTime;
      if (tripDepartureTime > max) max = tripDepartureTime;
    });

    return { min, max };
  };

  const calculateMinMaxPrice = () => {
    let min = Infinity;
    let max = -Infinity;

    trips.forEach(trip => {
      const tripPrice = trip.price_start_with; // Assuming there's always pricing data available
      if (tripPrice < min) min = tripPrice;
      if (tripPrice > max) max = tripPrice;
    });

    return { min, max };
  };

  // Extracting unique companies from trips
  const getUniqueCompanies = () => {
    const companies = new Set();
    trips.forEach(trip => {
      companies.add(trip.company);
    });
    return Array.from(companies);
  };

  const { min: minArrival, max: maxArrival } = calculateMinMaxArrivalTime();
  const {
    min: minDeparture,
    max: maxDeparture
  } = calculateMinMaxDepartureTime();
  const { min: minPrice, max: maxPrice } = calculateMinMaxPrice();
  const [minArrivalTime, setMinArrivalTime] = useState(minArrival);
  const [maxArrivalTime, setMaxArrivalTime] = useState(maxArrival);
  const [minDepartureTime, setMinDepartureTime] = useState(minDeparture);
  const [maxDepartureTime, setMaxDepartureTime] = useState(maxDeparture);
  const [minPriceValue, setMinPriceValue] = useState(minPrice);
  const [maxPriceValue, setMaxPriceValue] = useState(maxPrice);
  const [companies, setCompanies] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);

  useEffect(
    () => {
      // Set initial state values for arrival and departure times
      const {
        min: initialMinArrival,
        max: initialMaxArrival
      } = calculateMinMaxArrivalTime();
      const {
        min: initialMinDeparture,
        max: initialMaxDeparture
      } = calculateMinMaxDepartureTime();

      setMinArrivalTime(initialMinArrival);
      setMaxArrivalTime(initialMaxArrival);
      setMinDepartureTime(initialMinDeparture);
      setMaxDepartureTime(initialMaxDeparture);

      // Set initial state values for price
      const {
        min: initialMinPrice,
        max: initialMaxPrice
      } = calculateMinMaxPrice();
      setMinPriceValue(initialMinPrice);
      setMaxPriceValue(initialMaxPrice);
    },
    [loading]
  );

  useEffect(
    () => {
      if (!filteredTrips.length) {
        // Check if filteredTrips is empty to avoid re-rendering
        setFilteredTrips(trips);
        setCompanies(getUniqueCompanies());
      }
    },
    [trips, filteredTrips]
  ); // Include filteredTrips in dependencies

  // Function to handle slider change for arrival time
  const handleArrivalSliderChange = (event, minTime, maxTime) => {
    const newMinTime = minTime === "min" ? event.target.value : minTime;
    const newMaxTime = maxTime === "max" ? event.target.value : maxTime;

    setMinArrivalTime(newMinTime);
    setMaxArrivalTime(newMaxTime);

    filterTrips(
      newMinTime,
      newMaxTime,
      minDepartureTime,
      maxDepartureTime,
      minPriceValue,
      maxPriceValue
    );
  };

  // Function to handle slider change for departure time
  const handleDepartureSliderChange = (event, minTime, maxTime) => {
    const newMinTime = minTime === "min" ? event.target.value : minTime;
    const newMaxTime = maxTime === "max" ? event.target.value : maxTime;

    setMinDepartureTime(newMinTime);
    setMaxDepartureTime(newMaxTime);

    filterTrips(
      minArrivalTime,
      maxArrivalTime,
      newMinTime,
      newMaxTime,
      minPriceValue,
      maxPriceValue
    );
  };

  // Function to handle slider change for price
  const handlePriceSliderChange = (event, minPrice, maxPrice) => {
    const newMinPrice = minPrice === "min" ? event.target.value : minPrice;
    const newMaxPrice = maxPrice === "max" ? event.target.value : maxPrice;

    setMinPriceValue(newMinPrice);
    setMaxPriceValue(newMaxPrice);

    filterTrips(
      minArrivalTime,
      maxArrivalTime,
      minDepartureTime,
      maxDepartureTime,
      newMinPrice,
      newMaxPrice
    );
  };
  // State to track checked status of each company
  const [companyFilters, setCompanyFilters] = useState({});

  // Function to initialize company filters
  useEffect(
    () => {
      const initialFilters = {};
      companies.forEach(company => {
        initialFilters[company] = true; // Set all companies initially checked
      });
      setCompanyFilters(initialFilters);
    },
    [companies]
  );

  // Function to handle checkbox change for company
  const handleCompanyChange = company => {
    setCompanyFilters(prevFilters => ({
      ...prevFilters,
      [company]: !prevFilters[company] // Toggle checked status
    }));
  };

  // state to track checked status of each departure stations

  // Function to filter trips by arrival, departure time, price, and company
  const filterTrips = (
    minArrivalTime,
    maxArrivalTime,
    minDepartureTime,
    maxDepartureTime,
    minPrice,
    maxPrice
  ) => {
    const filtered = trips.filter(trip => {
      const arrivalTime = new Date(trip.stations_to[0].arrival_at).getTime();
      const departureTime = new Date(
        trip.stations_from[0].arrival_at
      ).getTime();
      const tripPrice = trip.price_start_with; // Assuming there's always pricing data available

      return (
        arrivalTime >= minArrivalTime &&
        arrivalTime <= maxArrivalTime &&
        departureTime >= minDepartureTime &&
        departureTime <= maxDepartureTime &&
        tripPrice >= minPrice &&
        tripPrice <= maxPrice &&
        companies.includes(trip.company)
      );
    });
    setFilteredTrips(filtered);
    setModifiyTrips(filtered); // Update modified trips
  };

  // Function to filter trips by company
  const filterByCompany = () => {
    const selectedCompanies = Object.keys(companyFilters).filter(
      company => companyFilters[company]
    );
    const filtered = trips.filter(trip => {
      return selectedCompanies.includes(trip.company);
    });
    setFilteredTrips(filtered);
    setModifiyTrips(filtered); // Update modified trips
  };

  useEffect(filterByCompany, [companyFilters]);

  // State to track checked status of each category
  const [categoryFilters, setCategoryFilters] = useState({});
  // Function to initialize category filters
  useEffect(
    () => {
      if (Object.keys(categoryFilters).length === 0) {
        // Check if categoryFilters is empty to avoid re-rendering
        const initialFilters = {};
        trips.forEach(trip => {
          if (Array.isArray(trip.bus.category)) {
            trip.bus.category.forEach(category => {
              initialFilters[category] = true; // Set all categories initially checked
            });
          } else if (typeof trip.bus.category === "string") {
            initialFilters[trip.bus.category] = true; // For single category, set it as checked
          }
        });
        setCategoryFilters(initialFilters);
      }
    },
    [trips, categoryFilters]
  ); // Include categoryFilters in dependencies

  // Function to handle checkbox change for category
  const handleCategoryChange = category => {
    setCategoryFilters(prevFilters => ({
      ...prevFilters,
      [category]: !prevFilters[category] // Toggle checked status
    }));
  };
  // Function to filter trips by category
  const filterByCategory = () => {
    const selectedCategories = Object.keys(categoryFilters).filter(
      category => categoryFilters[category]
    );
    const filtered = trips.filter(trip => {
      if (Array.isArray(trip.bus.category)) {
        return trip.bus.category.some(category =>
          selectedCategories.includes(category)
        );
      } else if (typeof trip.bus.category === "string") {
        return selectedCategories.includes(trip.bus.category);
      }
      return false;
    });
    setFilteredTrips(filtered);
    setModifiyTrips(filtered); // Update modified trips
  };

  useEffect(filterByCategory, [categoryFilters]);

  // State to track checked status of each departure station

  // function to get time by H-M and date by MM/DD
  const formattedTimeWithDate = timestamp => {
    const date = new Date(parseInt(timestamp));
    const day = date.getDate();
    const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Pad single-digit day and month with leading zeros
    const formattedDay = day < 10 ? `${day}` : day;
    const formattedMonth = month < 10 ? `${month}` : month;

    // Pad single-digit minutes with a leading zero
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `(${formattedMonth}/${formattedDay}) ${hours}:${formattedMinutes}`;
  };

  //  handle menu buttons

  const [openButton, setOpenButton] = useState(null);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenButton(null); // Close the menu if clicked outside the menu container
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClick = buttonName => {
    setOpenButton(openButton === buttonName ? null : buttonName); // Toggle the open state of the clicked button
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Sidebar content in upper max-md screen */}

      {loading
        ? <div className="flex max-md:hidden w-full">
            <div className="w-full   h-64 bg-white shadow-xl rounded-xl my-3 py-4 animate-pulse">
             
          </div>
          </div>
        : <div className=" px-2 max-md:hidden flex w-full ">
           
          
           
            <div className="w-full m-auto flex flex-col items-start">

              <div className="w-full flex flex-col items-start gap-3 px-4 bg-white shadow-xl rounded-xl my-3 py-4">
                <span className="text-gray-600 "> bus time filters </span>
                <div className="flex flex-col items-start gap-2 w-full ">
                  <span>
                    departure time ({trips[0].cities_from[0].name}){" "}
                  </span>
                  <div className="flex flex-col gap-2 items-center w-full">
                    <div className="flex justify-between items-center w-full">
                      <span>
                        {formattedTimeWithDate(minDepartureTime)}
                      </span>

                      <span>
                        {formattedTimeWithDate(maxDepartureTime)}
                      </span>
                    </div>
                    <div className="flex justify-center bg-gray-200 h-2 rounded-xl w-full">
                      <input
                        id="minDepartureTimeSlider"
                        type="range"
                        min={minDeparture}
                        max={maxDeparture}
                        step="1800" // step by one hour (3600 seconds)
                        value={minDepartureTime}
                        onChange={e =>
                          handleDepartureSliderChange(
                            e,
                            "min",
                            maxDepartureTime
                          )}
                      />

                      <input
                        id="maxDepartureTimeSlider"
                        type="range"
                        min={minDeparture}
                        max={maxDeparture}
                        step="1800" // step by one hour (3600 seconds)
                        value={maxDepartureTime}
                        onChange={e =>
                          handleDepartureSliderChange(
                            e,
                            minDepartureTime,
                            "max"
                          )}
                      />
                    </div>
                    <br />
                  </div>

                  <span>
                    arrival time ({trips[0].cities_to[0].name}){" "}
                  </span>
                  <div className="flex flex-col items-start gap-2 w-full ">
                    <div className="flex flex-col  items-center gap-2 w-full ">
                      <div className="flex justify-between items-center w-full ">
                        <span>
                          {formattedTimeWithDate(minArrivalTime)}
                        </span>
                        <span>
                          {formattedTimeWithDate(maxArrivalTime)}
                        </span>
                      </div>
                      <div className="flex justify-center h-2 rounded-xl bg-gray-200 w-full">
                        <input
                          id="minArrivalTimeSlider"
                          type="range"
                          min={minArrival}
                          max={maxArrival}
                          step="3600" // step by one hour (3600 seconds)
                          value={minArrivalTime}
                          onChange={e =>
                            handleArrivalSliderChange(e, "min", maxArrivalTime)}
                        />
                        {/* <label htmlFor="maxArrivalTimeSlider">Maximum Arrival Time: </label> */}
                        <input
                          id="maxArrivalTimeSlider"
                          type="range"
                          min={minArrival}
                          max={maxArrival}
                          step="3600" // step by one hour (3600 seconds)
                          value={maxArrivalTime}
                          onChange={e =>
                            handleArrivalSliderChange(e, minArrivalTime, "max")}
                        />
                      </div>

                      <br />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col items-start gap-3 px-4 bg-white shadow-xl rounded-xl my-3 py-4 ">
                <span className="text-gray-600"> bus prices filter </span>
                <div className="flex flex-col  items-center w-full">
                  <div className="w-full flex justify-between items-center">
                    <span>
                      {minPriceValue} EL
                    </span>
                    <span>
                      {maxPriceValue} EL
                    </span>
                  </div>
                  <br />
                  <div className=" w-full flex justify-center items-center bg-gray-200 rounded-xl h-2">
                    <input
                      id="minPriceSlider"
                      type="range"
                      min={minPrice}
                      max={maxPrice + 1}
                      step="1" // step by $10
                      value={minPriceValue}
                      onChange={e =>
                        handlePriceSliderChange(e, "min", maxPriceValue)}
                    />

                    <input
                      id="maxPriceSlider"
                      type="range"
                      min={minPrice}
                      max={maxPrice + 1}
                      step="1" // step by $10
                      value={maxPriceValue}
                      onChange={e =>
                        handlePriceSliderChange(e, minPriceValue, "max")}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 px-4 bg-white shadow-xl rounded-xl my-3 py-4 w-full">
                <span className="text-gray-600"> operator filter </span>
                {companies.map(company =>
                  <div
                    key={company}
                    className={`h-10 w-full rounded-xl flex justify-between items-center px-4 ${!companyFilters[
                      company
                    ]
                      ? "bg-gray-100"
                      : "bg-gray-800"}`}
                  >
                    <label
                      htmlFor={company}
                      className={`cursor-pointer flex items-center justify-between gap-4 w-full h-full ${!companyFilters[
                        company
                      ]
                        ? "text-gray-800"
                        : "text-gray-200"}`}
                    >
                      <span className="">
                        {company}
                      </span>

                      <input
                        type="checkbox"
                        id={company}
                        value={company}
                        checked={companyFilters[company]}
                        onChange={() => handleCompanyChange(company)}
                        style={{
                          opacity: 0,
                          position: "absolute",
                          left: "-9999px"
                        }}
                      />
                      {companyFilters[company]
                        ? <span className="text-gray-200 ">&#10004;</span>
                        : <span className="text-gray-800 ">x</span>}
                    </label>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-start gap-3 px-4 bg-white shadow-xl rounded-xl my-3 py-4 w-full ">
                <span className="text-gray-600">classes filter </span>
                {Object.keys(categoryFilters).map(category =>
                  <div
                    key={category}
                    className={`h-10 rounded-xl flex justify-between items-center w-full px-4 ${!categoryFilters[
                      category
                    ]
                      ? "bg-gray-200"
                      : "bg-gray-800"}`}
                  >
                    <label
                      htmlFor={category}
                      className={`cursor-pointer flex items-center justify-between w-full h-full ${!categoryFilters[
                        category
                      ]
                        ? "text-gray-800"
                        : "text-gray-200"}`}
                    >
                      <span className="mr-2">
                        {category}
                      </span>

                      <input
                        type="checkbox"
                        id={category}
                        value={category}
                        checked={categoryFilters[category]}
                        onChange={() => handleCategoryChange(category)}
                        style={{
                          opacity: 0,
                          position: "absolute",
                          left: "-9999px"
                        }}
                      />
                      {categoryFilters[category]
                        ? <span className="text-gray-200">&#10004;</span>
                        : <span className="text-gray-800">x</span>}
                    </label>
                  </div>
                )}
              </div>

              {/* <div className="flex flex-col items-start gap-3 px-4 bg-white shadow-xl rounded-xl my-3 py-4 w-full ">
                <span className="text-gray-600">Departure Stations</span>
                {Object.keys(stationFilters).map(station =>
                  <div
                    key={station}
                    className={`h-10 rounded-xl flex justify-between items-center w-full px-4 ${!stationFilters[
                      station
                    ]
                      ? "bg-gray-200"
                      : "bg-gray-800"}`}
                  >
                    <label
                      htmlFor={station}
                      className={`cursor-pointer flex items-center justify-between w-full h-full ${!stationFilters[
                        station
                      ]
                        ? "text-gray-800"
                        : "text-gray-200"}`}
                    >
                      <span className="mr-2">
                        {station}
                      </span>
                      <input
                        type="checkbox"
                        id={station}
                        value={station}
                        checked={stationFilters[station]}
                        onChange={() => handleStationChange(station)}
                        style={{
                          opacity: 0,
                          position: "absolute",
                          left: "-9999px"
                        }}
                      />
                      {stationFilters[station]
                        ? <span className="text-gray-200">&#10004;</span>
                        : <span className="text-gray-800">x</span>}
                    </label>
                  </div>
                )}
              </div> */}
            </div>
          </div>}

      {/* Sidebar content in under max-md screen */}

      {loading
        ? <div className="w-full  justify-between  items-center overflow-hidden gap-4 max-md:flex hidden">
            <button className="button-menu w-32 px-8 h-10 my-4 rounded-lg shadow-xl bg-gray-400 animate-pulse " />
            <button className="button-menu w-32 px-8 h-10 my-4 rounded-lg shadow-xl bg-gray-400 animate-pulse" />
            <button className="button-menu w-32 px-8 h-10 my-4 rounded-lg shadow-xl bg-gray-400 animate-pulse" />
            <button className="button-menu w-32 px-8 h-10 my-4 rounded-lg shadow-xl bg-gray-400 animate-pulse" />
          </div>
        : <div className="hidden max-md:flex w-full ">
            <div className="relative w-full" ref={menuRef}>
              <Slider>
                <button
                  className="button-menu w-32 px-8 h-10 my-4 rounded-lg shadow-xl bg-gray-800 text-gray-200"
                  onClick={() => handleClick("Times")}
                >
                  Times
                </button>
                <button
                  className="button-menu w-32 px-8 h-10 my-4 rounded-lg shadow-xl bg-gray-800 text-gray-200"
                  onClick={() => handleClick("Price")}
                >
                  Price
                </button>
                <button
                  className="button-menu w-32 px-8 h-10 my-4 rounded-lg shadow-xl bg-gray-800 text-gray-200"
                  onClick={() => handleClick("Operator")}
                >
                  Operator
                </button>
                <button
                  className="button-menu w-32 px-8 h-10 my-4 rounded-lg shadow-xl bg-gray-800 text-gray-200"
                  onClick={() => handleClick("classes")}
                >
                  classes
                </button>
              </Slider>
              {openButton &&
                <div className="menu-container">
                  <div className="button-div px-4">
                    {openButton === "Times" &&
                      <div className="w-full flex flex-col items-start gap-3 px-4 bg-white shadow-xl rounded-xl my-3 py-4">
                        <div className="flex justify-between items-center w-full">
                          <span className="text-gray-600 ">
                            {" "}bus time filters{" "}
                          </span>
                          <span
                            onClick={() => setOpenButton(null)}
                            className="w-6 h-6 flex justify-center items-center rounded-full bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-400"
                          >
                            x
                          </span>
                        </div>
                        <div className="flex flex-col items-start gap-2 w-full ">
                          <span>
                            departure time ({trips[0].cities_from[0].name}){" "}
                          </span>
                          <div className="flex flex-col gap-2 items-center w-full">
                            <div className="flex justify-between items-center w-full">
                              <span>
                                {formattedTimeWithDate(minDepartureTime)}
                              </span>

                              <span>
                                {formattedTimeWithDate(maxDepartureTime)}
                              </span>
                            </div>
                            <div className="flex justify-center bg-gray-200 h-2 rounded-xl w-full">
                              <input
                                id="minDepartureTimeSlider"
                                type="range"
                                min={minDeparture}
                                max={maxDeparture}
                                step="1800" // step by one hour (3600 seconds)
                                value={minDepartureTime}
                                onChange={e =>
                                  handleDepartureSliderChange(
                                    e,
                                    "min",
                                    maxDepartureTime
                                  )}
                              />

                              <input
                                id="maxDepartureTimeSlider"
                                type="range"
                                min={minDeparture}
                                max={maxDeparture}
                                step="1800" // step by one hour (3600 seconds)
                                value={maxDepartureTime}
                                onChange={e =>
                                  handleDepartureSliderChange(
                                    e,
                                    minDepartureTime,
                                    "max"
                                  )}
                              />
                            </div>
                            <br />
                          </div>

                          <span>
                            arrival time ({trips[0].cities_to[0].name}){" "}
                          </span>
                          <div className="flex flex-col items-start gap-2 w-full ">
                            <div className="flex flex-col  items-center gap-2 w-full ">
                              <div className="flex justify-between items-center w-full ">
                                <span>
                                  {formattedTimeWithDate(minArrivalTime)}
                                </span>
                                <span>
                                  {formattedTimeWithDate(maxArrivalTime)}
                                </span>
                              </div>
                              <div className="flex justify-center h-2 rounded-xl bg-gray-200 w-full">
                                <input
                                  id="minArrivalTimeSlider"
                                  type="range"
                                  min={minArrival}
                                  max={maxArrival}
                                  step="3600" // step by one hour (3600 seconds)
                                  value={minArrivalTime}
                                  onChange={e =>
                                    handleArrivalSliderChange(
                                      e,
                                      "min",
                                      maxArrivalTime
                                    )}
                                />
                                {/* <label htmlFor="maxArrivalTimeSlider">Maximum Arrival Time: </label> */}
                                <input
                                  id="maxArrivalTimeSlider"
                                  type="range"
                                  min={minArrival}
                                  max={maxArrival}
                                  step="3600" // step by one hour (3600 seconds)
                                  value={maxArrivalTime}
                                  onChange={e =>
                                    handleArrivalSliderChange(
                                      e,
                                      minArrivalTime,
                                      "max"
                                    )}
                                />
                              </div>

                              <br />
                            </div>
                          </div>
                        </div>
                      </div>}

                    {openButton === "Price" &&
                      <div className="w-full flex flex-col items-start gap-3 px-4 bg-white shadow-xl rounded-xl my-3 py-4 ">
                        <div className="flex justify-between items-center w-full">
                          <span className="text-gray-600 ">bus prices</span>
                          <span
                            onClick={() => setOpenButton(null)}
                            className="w-6 h-6 flex justify-center items-center rounded-full bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-400"
                          >
                            x
                          </span>
                        </div>
                        <div className="flex flex-col  items-center w-full">
                          <div className="w-full flex justify-between items-center">
                            <span>
                              {minPriceValue} EL
                            </span>
                            <span>
                              {maxPriceValue} EL
                            </span>
                          </div>
                          <br />
                          <div className=" w-full flex justify-center items-center bg-gray-200 rounded-xl h-2">
                            <input
                              id="minPriceSlider"
                              type="range"
                              min={minPrice}
                              max={maxPrice + 1}
                              step="1" // step by $10
                              value={minPriceValue}
                              onChange={e =>
                                handlePriceSliderChange(
                                  e,
                                  "min",
                                  maxPriceValue
                                )}
                            />

                            <input
                              id="maxPriceSlider"
                              type="range"
                              min={minPrice}
                              max={maxPrice + 1}
                              step="1" // step by $10
                              value={maxPriceValue}
                              onChange={e =>
                                handlePriceSliderChange(
                                  e,
                                  minPriceValue,
                                  "max"
                                )}
                            />
                          </div>
                        </div>
                      </div>}
                    {openButton === "Operator" &&
                      <div className="flex flex-col items-start gap-3 px-4 bg-white shadow-xl rounded-xl my-3 py-4 w-full">
                        <div className="flex justify-between items-center w-full">
                          <span className="text-gray-600 ">
                            {" "}operator filters{" "}
                          </span>
                          <span
                            onClick={() => setOpenButton(null)}
                            className="w-6 h-6 flex justify-center items-center rounded-full bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-400"
                          >
                            x
                          </span>
                        </div>
                        {companies.map(company =>
                          <div
                            key={company}
                            className={`h-10 w-full rounded-xl flex justify-between items-center px-4 ${!companyFilters[
                              company
                            ]
                              ? "bg-gray-100"
                              : "bg-gray-800"}`}
                          >
                            <label
                              htmlFor={company}
                              className={`cursor-pointer flex items-center justify-between gap-4 w-full h-full ${!companyFilters[
                                company
                              ]
                                ? "text-gray-800"
                                : "text-gray-200"}`}
                            >
                              <span className="">
                                {company}
                              </span>

                              <input
                                type="checkbox"
                                id={company}
                                value={company}
                                checked={companyFilters[company]}
                                onChange={() => handleCompanyChange(company)}
                                style={{
                                  opacity: 0,
                                  position: "absolute",
                                  left: "-9999px"
                                }}
                              />
                              {companyFilters[company]
                                ? <span className="text-gray-200 ">
                                    &#10004;
                                  </span>
                                : <span className="text-gray-800 ">x</span>}
                            </label>
                          </div>
                        )}
                      </div>}
                    {openButton === "classes" &&
                      <div className="flex flex-col items-start gap-3 px-4 bg-white shadow-xl rounded-xl my-3 py-4 w-full ">
                        <div className="flex justify-between items-center w-full">
                          <span className="text-gray-600 ">
                            {" "}classes filters{" "}
                          </span>
                          <span
                            onClick={() => setOpenButton(null)}
                            className="w-6 h-6 flex justify-center items-center rounded-full bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-400"
                          >
                            x
                          </span>
                        </div>
                        {Object.keys(categoryFilters).map(category =>
                          <div
                            key={category}
                            className={`h-10 rounded-xl flex justify-between items-center w-full px-4 ${!categoryFilters[
                              category
                            ]
                              ? "bg-gray-200"
                              : "bg-gray-800"}`}
                          >
                            <label
                              htmlFor={category}
                              className={`cursor-pointer flex items-center justify-between w-full h-full ${!categoryFilters[
                                category
                              ]
                                ? "text-gray-800"
                                : "text-gray-200"}`}
                            >
                              <span className="mr-2">
                                {category}
                              </span>

                              <input
                                type="checkbox"
                                id={category}
                                value={category}
                                checked={categoryFilters[category]}
                                onChange={() => handleCategoryChange(category)}
                                style={{
                                  opacity: 0,
                                  position: "absolute",
                                  left: "-9999px"
                                }}
                              />
                              {categoryFilters[category]
                                ? <span className="text-gray-200">
                                    &#10004;
                                  </span>
                                : <span className="text-gray-800">x</span>}
                            </label>
                          </div>
                        )}
                      </div>}
                  </div>
                </div>}
            </div>
          </div>}
    </div>
  );
};
