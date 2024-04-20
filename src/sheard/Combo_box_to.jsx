import React, { useState, useRef, useEffect } from "react";
import {get_cities_for_bus_search_form} from '../redux/actions/bus_travel_actions/bus_travel_actions'
import {useDispatch ,  useSelector} from 'react-redux'

export const Combo_box_to = ({ options, setonSelect_to , converter_trip }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const comboBoxRef = useRef(null);
  const {data} = useSelector(state => state.cityReducer)

  const dispatch = useDispatch()
  // Close the ComboBox when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (comboBoxRef.current && !comboBoxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [comboBoxRef]);
  useEffect(() => {
    dispatch(get_cities_for_bus_search_form())
  } , [])
  let filteredOptions = [];
  data.map((item) => {
    if (
      item.name
        .toString()
        .trim()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) {
      filteredOptions.push(item);
    }
    return 0;
  });

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option.name);
    setonSelect_to(option.id);
    setIsOpen(false);
  };

  return (
    <div
      ref={comboBoxRef}
      className={`relative w-1/4 h-10 outline-none cursor-pointer rounded-md ${converter_trip} max-md:w-1/3 md:w-1/3`}
    >
      <div
        className="w-full bg-white border border-gray-400 rounded shadow leading-tight cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex justify-between items-center px-4 py-2">
          <div className="text-sm max-md:text-xs max-sm:text-xs">
            {selectedOption || "Select an option"}
          </div>
          <div>
            <svg
              className={`h-4 w-4 transition-transform ${
                isOpen ? "transform rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.293 7.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L10 9.586l2.293-2.293a1 1 0 0 1 1.414 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute w-full bg-white border border-gray-400 rounded-b shadow mt-1">
          <input
            type="text"
            className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
            <div className="z-50 overflow-y-scroll h-[200px] w-full ">
            {filteredOptions.map((option, index) =>
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 "
                onClick={() => handleSelectOption(option)}
              >
                {option.name}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
