import React, { useState, useEffect } from "react";

export const CarFilters = ({ setModifyTrips, dataSearchCar }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (dataSearchCar) {
      setData(dataSearchCar);
    }
  }, [dataSearchCar]);

  // State for price filter
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000); // Default max price
  const [minPriceValue, setMinPriceValue] = useState(0);
  const [maxPriceValue, setMaxPriceValue] = useState(10000);

  // State for company filter
  const [companyFilters, setCompanyFilters] = useState({});
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const prices = data.map((trip) => trip.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);
      setMinPriceValue(minPrice);
      setMaxPriceValue(maxPrice);

      const uniqueCompanies = [...new Set(data.map((trip) => trip.company_name))];
      setCompanies(uniqueCompanies);
      const initialCompanyFilters = uniqueCompanies.reduce((acc, company) => {
        acc[company] = true;
        return acc;
      }, {});
      setCompanyFilters(initialCompanyFilters);
    }
  }, [data]);

  const handlePriceSliderChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (type === "min") {
      if (value <= maxPriceValue) setMinPriceValue(value);
    } else {
      if (value >= minPriceValue) setMaxPriceValue(value);
    }
  };

  const handleCompanyChange = (company) => {
    setCompanyFilters((prevFilters) => ({
      ...prevFilters,
      [company]: !prevFilters[company],
    }));
  };

  useEffect(() => {
    const filteredTrips = data.filter(
      (trip) =>
        trip.price >= minPriceValue &&
        trip.price <= maxPriceValue &&
        companyFilters[trip.company_name]
    );
    setModifyTrips(filteredTrips);
  }, [minPriceValue, maxPriceValue, companyFilters, data]);

  return (
    <div>
      {/* Desktop screens */}
      <div className="w-full min-h-auto max-md:w-full max-md:hidden">
        <div className="w-full flex flex-col items-start gap-3 px-4  bg-white shadow-xl rounded-xl py-4">
          <span className="text-gray-600">Bus Prices Filter</span>
          <div className="flex flex-col items-center w-full">
            <div className="w-full flex justify-between items-center">
              <span>{minPriceValue} EL</span>
              <span>{maxPriceValue} EL</span>
            </div>
            <br />
            <div className="w-full flex justify-center items-center bg-gray-200 rounded-xl h-2">
              <input
                id="minPriceSlider"
                type="range"
                min={minPrice}
                max={maxPrice}
                step="1"
                value={minPriceValue}
                onChange={(e) => handlePriceSliderChange(e, "min")}
                className="w-full"
              />
              <input
                id="maxPriceSlider"
                type="range"
                min={minPrice}
                max={maxPrice}
                step="1"
                value={maxPriceValue}
                onChange={(e) => handlePriceSliderChange(e, "max")}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 px-4 bg-white shadow-xl rounded-xl my-3 py-4 w-full">
          <span className="text-gray-600">Operator Filter</span>
          {companies.map((company) => (
            <div
              key={company}
              className={`h-10 w-full rounded-xl shadow-xl flex justify-between items-center px-4 ${
                !companyFilters[company] ? "bg-gray-100" : "bg-white"
              }`}
            >
              <label
                htmlFor={company}
                className={`cursor-pointer flex items-center justify-between gap-4 w-full h-full ${
                  !companyFilters[company] ? "text-gray-800" : "text-gray-800"
                }`}
              >
                <span>{company}</span>
                <input
                  type="checkbox"
                  id={company}
                  value={company}
                  checked={companyFilters[company]}
                  onChange={() => handleCompanyChange(company)}
                  style={{
                    opacity: 0,
                    position: "absolute",
                    left: "-9999px",
                  }}
                />
                {companyFilters[company] ? (
                  <span className="text-gray-800">&#10004;</span>
                ) : (
                  <span className="text-gray-800">x</span>
                )}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile and small screens */}
      <div className="hidden max-md:flex justify-center w-full"></div>
    </div>
  );
};
