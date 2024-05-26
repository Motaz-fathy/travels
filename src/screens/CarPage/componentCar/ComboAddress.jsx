import React, { useState, useRef, useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";

export const ComboAddress = ({
  addresses,
  selectedAddressFrom,
  setSelectedAddressFrom,
  selectedAddressTo,
  setSelectedAddressTo,
  str
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const comboBoxRef = useRef(null);

  const toggleComboBox = () => {
    setIsOpen(!isOpen);
  };

  const handleAddressSelect = address => {
    if(str === "from"){
        setSelectedAddressFrom(address);
    } else if(str === "to"){
    setSelectedAddressTo(address);
    }
    setIsOpen(false); // Close the dropdown when address is selected
  };

  const handleClickOutside = event => {
    if (comboBoxRef.current && !comboBoxRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Add event listener to handle clicks outside the combo box
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" w-full" ref={comboBoxRef}>
      {/* Combo box button */}

      <button
        type="button"
        className="px-4 w-full flex justify-start items-center gap-1 py-2 text-start bg-white shadow-xl rounded-md border border-gray-300 focus:outline-none"
        onClick={toggleComboBox}
      >
        <IoLocationSharp className="text-md" />
       {str === "from" &&   <span>
          {selectedAddressFrom
            ? selectedAddressFrom.map_location.address_name
            : "Select an address"}
        </span>}

        {str === "to" &&   <span>
          {selectedAddressTo
            ? selectedAddressTo.map_location.address_name
            : "Select an address"}
        </span>}
        
      </button>

      {/* Dropdown menu */}
      {isOpen &&
        <div className="  mt-1 w-full bg-white rounded-md shadow-lg">
          {addresses?.map((address, index) =>
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-start max-md:text-sm items-center gap-2 "
              onClick={() => handleAddressSelect(address)}
            >
              <IoLocationSharp  />{" "}
              <span>{address.map_location.address_name}</span>
            </div>
          )}
        </div>}
    </div>
  );
};
