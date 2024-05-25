import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete
} from "@react-google-maps/api";
import { updateAddressAction } from "../redux/actions/profile/profile_actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const libraries = ["places"];

const containerStyle = {
  width: "100%",
  height: "100%"
};

const MapAndAutoEdit = ({ updateData }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBaKNNFMMwoe8fmhuk5fEWHHvyZDyQgxy8",
    libraries
  });

  const dispatch = useDispatch();
  const [location, setLocation] = useState({
    lat: updateData?.map_location?.lat || 30.033333,
    lng: updateData?.map_location?.lng || 31.233334
  });
  const [place, setPlace] = useState(null);
  const autocompleteRef = useRef(null);
  const [attempt, setAttempt] = useState(false);

  const { loadingUpdate, UpdateMessage, errorUpdate } = useSelector(
    (state) => state.updateAddressReducer
  );
  const loginReducer = useSelector((state) => state.LoginReducer);
  const token = loginReducer.data?.data?.api_token || null;

  // Load Autocomplete
  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      setPlace(place);
      setLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    }
  };

  // Handle address update
  const handleEditAddress = async () => {
    if (!place || !location || !token) return;

    const AddressData = {
      name: place.name,
      map_location: {
        lat: location.lat,
        lng: location.lng,
        address_name: place.formatted_address
      },
      city_id: updateData.id
    };

    await dispatch(updateAddressAction(token, updateData.id, AddressData));
    setAttempt(true);
  };

  useEffect(() => {
    if (attempt) {
      if (UpdateMessage) {
        toast.success("Address updated successfully");
      } else if (errorUpdate) {
        toast.error(errorUpdate);
      }
      setAttempt(false);
    }
  }, [attempt, UpdateMessage, errorUpdate]);

  return isLoaded ? (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-2/3 max-md:w-full flex justify-center items-center gap-4 max-md:flex-col">
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          options={{
            types: ["(regions)"],
            componentRestrictions: { country: "eg" }
          }}
          className="w-3/4 max-md:w-full"
        >
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md shadow-md focus:outline-none"
            placeholder="Enter a location"
          />
        </Autocomplete>
        <button
          onClick={handleEditAddress}
          className="w-1/4 max-md:w-full flex justify-center items-center gap-2 bg-gray-900 hover:bg-gray-800 py-2 rounded-md text-gray-200 transition-all duration-300"
        >
          <span>Edit Address</span>
          {loadingUpdate && <FaSpinner className="animate-spin" />}
        </button>
      </div>
      <div className="w-2/3 max-md:w-full max-md:px-2 rounded-xl h-96 py-4">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={16}
        >
          <Marker position={location} />
        </GoogleMap>
      </div>
    </div>
  ) : (
    <div className="w-full flex justify-center items-center">
      <FaSpinner className="animate-spin" />
    </div>
  );
};

export default MapAndAutoEdit;
