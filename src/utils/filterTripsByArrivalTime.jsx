import React, { useState, useEffect } from "react";
import Slider from "../sheard/Slider";
// Functional component for filtering trips by arrival, departure time, price, and company
export const FilterTrips = ({ trips, setModifiyTrips ,   loading , setSaidCtr}) => {
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
      if (!filteredTrips.length) {
        // Check if filteredTrips is empty to avoid re-rendering
        setFilteredTrips(trips);
        setCompanies(getUniqueCompanies());
      }
    },
    [trips, filteredTrips ]
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
  return (
    <div
          >
      {/* Sidebar content */}
       {loading ? <div></div> : 
             <div className=" px-2">
      
             {/* Logo */}
             <div className="text-center mb-6">
               {/* <img src="/path/to/logo.png" alt="Logo" className="w-8 h-8" /> */}
               <div className="hidden max-sm:flex" onClick={() => setSaidCtr(true)}>{">"}</div>
             </div>
             {/* Buttons */}
             <div className="w-full m-auto flex flex-col items-start">
               
               <div className="w-full flex flex-col items-start gap-3 px-4 bg-white shadow-xl rounded-xl my-3 py-4">
                 <span className="text-gray-800 "> Bus Time : </span>
                <div className="flex flex-col items-start gap-2 w-full ">
                <span>departure time : </span>
                 <div className="flex justify-center gap-2 items-center w-full">
                   {new Date(parseInt(minDepartureTime)).getHours()}:00
                   <div className="flex justify-center bg-gray-200 h-2 rounded-xl w-full">
                     <input
                       id="minDepartureTimeSlider"
                       type="range"
                       min={minDeparture}
                       max={maxDeparture + "60"}
                       step="1800" // step by one hour (3600 seconds)
                       value={minDepartureTime}
                       onChange={e =>
                         handleDepartureSliderChange(e, "min", maxDepartureTime)}
                     />
                     <input
                       id="maxDepartureTimeSlider"
                       type="range"
                       min={minDeparture}
                       max={maxDeparture}
                       step="1800" // step by one hour (3600 seconds)
                       value={maxDepartureTime}
                       onChange={e =>
                         handleDepartureSliderChange(e, minDepartureTime, "max")}
                     />
                   </div>
                   {new Date(parseInt(maxDepartureTime)).getHours()}:00
                   <br />
                 </div>
                 
                 <span>arrival time : </span>
                 <div className="flex flex-col items-start gap-2 w-full ">
                   <div className="flex justify-center items-center gap-2 w-full ">
                     {/* <label htmlFor="minArrivalTimeSlider">Minimum Arrival Time: </label> */}
                     {new Date(parseInt(minArrivalTime)).getHours()}:00
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
                     {new Date(parseInt(maxArrivalTime)).getHours()}:00
                     <br />
                   </div>
                 </div>
     
                 <span>price : </span>
                 <div className="flex justify-center items-center w-full">
                   ${minPriceValue}
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
                   ${maxPriceValue}
                   <br />
                 </div>
               </div>
     
            
               </div>
     
               <div className="flex flex-col items-start gap-3 px-4 bg-white shadow-xl rounded-xl my-3 py-4 w-full">
                 <span className=""> operator : </span>
                 {companies.map(company =>
                   <div
                     key={company}
                     className={` h-10 w-full rounded-xl  flex justify-between items-center    px-4
                     ${!companyFilters[company] ? "bg-gray-100" : "bg-gray-200"}
                     `}
                   >
                     <input
                       type="checkbox"
                       id={company}
                       value={company}
                       checked={companyFilters[company]}
                       onChange={() => handleCompanyChange(company)}
                       className=""
                     />
                     <label
                       htmlFor={company}
                       className="text-gray-800 cursor-pointer flex items-center justify-center w-full h-full"
                     >
                       {company}
                     </label>
                   </div>
                 )}
     
               </div>
     
               <div className="flex flex-col items-start gap-3 px-4 bg-white shadow-xl rounded-xl my-3 py-4 w-full ">
                 <span>classes :</span>
                 {Object.keys(categoryFilters).map(category =>
                   <div
                     key={category}
                     className={` h-10  rounded-xl  flex justify-between items-center w-full  px-4
               ${!categoryFilters[category] ? "bg-gray-100" : "bg-gray-200"}
               `}
                   >
                     <input
                       type="checkbox"
                       id={category}
                       value={category}
                       checked={categoryFilters[category]}
                       onChange={() => handleCategoryChange(category)}
                       className="styled-checkbox"
                     />
                     <label
                       htmlFor={category}
                       className="text-gray-800 cursor-pointer flex items-center justify-center w-full h-full"
                     >
                       {category}
                     </label>
                   </div>
                 )}
              
               </div>
     
             </div>
           </div>
       }
    </div>
  );
};
