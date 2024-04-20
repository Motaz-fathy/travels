import axios from 'axios';
import {
  LOAD_CITIES_SCCESSE,
  GET_CITIES_SCCESSE,
  FAILD_CITIES_SCCESSE,
  LOAD_SEARCH,
  GET_SEARCH,
  FAILD_SEARCH,
  LOAD_SINGLE_TRIP,
  GET_SINGLE_TRIP,
  FAILD_SINGLE_TRIP,
  LOAD_AVIALBLE_SEATS ,
  GET_AVIALBLE_SEATS ,
  FAILD_AVIALBLE_SEATS
} from "../types";

/**
 * @doc get all cities for bus search form 
 * @access public 
 *  
 */

export const get_cities_for_bus_search_form = () => async dispatch => {
  try {
    dispatch({ type: LOAD_CITIES_SCCESSE });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    };

    const { data } = await axios.get(
        'https://app.telefreik.com/api/transports/locations',
      config
    );
    dispatch({
      type: GET_CITIES_SCCESSE , payload : data.data
    });
  } catch (error) {
    dispatch({
      type: FAILD_CITIES_SCCESSE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

/**
 * @doc get bus bus search form 
 * @access public 
 */

export const search_bus_trip = (city_from , city_to , date  ) => async dispatch => {
    try {
        dispatch({ type: LOAD_SEARCH });
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        };
        const {data} = await axios.get(`https://app.telefreik.com/api/v2/transports/buses/search?city_from=${city_from}&city_to=${city_to}&date=${date}` , config)
        dispatch({type : GET_SEARCH , payload : data})
    } catch (error) {
        dispatch({
            type: FAILD_SEARCH,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
          });
    }
}

export const SingleBusTrip = (trip) => async dispatch => {
  try {
    dispatch({type : LOAD_SINGLE_TRIP , payload : [] })
    if(trip.length !== 0 ) {
      dispatch({type : GET_SINGLE_TRIP , payload : trip })
    }else {
      dispatch({type : FAILD_SINGLE_TRIP , payload : {error : "trip not found ! "} })

    }
  } catch (error) {
    dispatch({type : FAILD_SINGLE_TRIP , payload : {error : "trip not found ! "} })
  }
}

export const AvilableSeats = (trip) => async dispatch => {
  try {
     dispatch({type : LOAD_AVIALBLE_SEATS , payload : []})
     const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    };
    const {data} =await  axios.get(`https://app.telefreik.com/api/transports/trips/37426/available-seats?from_city_id=${trip.stations_from[0].city_id}&to_city_id=${trip.stations_to[0].city_id}&from_location_id=${trip.stations_from[0].id}&to_location_id=${trip.stations_to[0].id}&date=${trip.date}`)
    console.log(data.data)
    dispatch({type : GET_AVIALBLE_SEATS , payload : data.data})
  } catch (error) {
    dispatch({
      type: FAILD_AVIALBLE_SEATS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}