import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete
} from "@react-google-maps/api";
import { createAddressAction } from "../redux/actions/profile/profile_actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const libraries = ["places"];

const containerStyle = {
  width: "100%",
  height: "100%"
};

const defaultCenter = {
  lat: 30.033333,
  lng: 31.233334
};

const MapAndAutoComplete = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBaKNNFMMwoe8fmhuk5fEWHHvyZDyQgxy8",
    libraries
  });
  const dispatch = useDispatch();
  const [location, setLocation] = useState(defaultCenter);
  const [place, setPlace] = useState(null);
  const autocompleteRef = useRef(null);
  const [attempt, setAttempt] = useState(false);
  const loginReducer = useSelector(state => state.LoginReducer);
  const { messageCreate, errorCreate, loadingCreate } = useSelector(
    state => state.createAddressReducer
  );

  let token = null;
  token = loginReducer.data.data.api_token || null;

  const onLoad = autocomplete => {
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

  const handleCreateAddress = async () => {
    const AddressData = {
      name: place && place.name,
      map_location: {
        lat: location.lat,
        lng: location.lng,
        address_name: place && place.formatted_address
      }
    };

    if (place !== null && location && token) {
      await dispatch(createAddressAction(AddressData, token));
      setAttempt(true);
    }
  };

  useEffect(() => {
    if (attempt === true) {
      if (messageCreate !== null) {
        toast.success("Address created successfully");
      } else {
        toast.error(errorCreate);
      }
    }
  }, [attempt, dispatch, messageCreate, errorCreate]);

  return isLoaded ? (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="w-5/6 flex justify-center items-center gap-4 max-md:flex-col">
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
          onClick={handleCreateAddress}
          className="w-1/4 max-md:w-full flex justify-center items-center gap-2 bg-gray-900 hover:bg-gray-800 py-2 rounded-md text-gray-200 transition-all duration-300"
        >
          <span>Add Address</span> {loadingCreate && <FaSpinner />}
        </button>
      </div>
      <div className="w-5/6 max-md:w-full max-md:px-2 rounded-xl h-96 py-4">
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
    <div className="w-full mx-auto">
      <FaSpinner />
    </div>
  );
};

export default MapAndAutoComplete;
