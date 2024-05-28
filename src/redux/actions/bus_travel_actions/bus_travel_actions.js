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
  FAILD_AVIALBLE_SEATS,
  LOAD_CREATE_TICKET ,
  SUCCESS_CREATE_TICKET ,
  FAIL_CREATE_TICKET,
  LOAD_CREATE_RETURN_TICKET ,
  SUCCESS_CREATE_RETURN_TICKET ,
  FAIL_CREATE_RETURN_TICKET,
  LOAD_PAYMENT ,
  SUCCESS_PAYMENT ,
  FAIL_PAYMENT
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
        const res = await axios.get(`https://app.telefreik.com/api/v2/transports/buses/search?city_from=${city_from}&city_to=${city_to}&date=${date}` , config)
        dispatch({type : GET_SEARCH , payload : res.data.data })
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

    const {data} = await  axios.get(`https://app.telefreik.com/api/transports/trips/${trip.id}/available-seats?from_city_id=${trip.stations_from[0].city_id}&to_city_id=${trip.stations_to[0].city_id}&from_location_id=${trip.stations_from[0].id}&to_location_id=${trip.stations_to[0].id}&date=${trip.date}`)
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

/**
* @doc create ticket action 
// @access private (just user can create ticket ) 
// Method POST 
*/

export const CreateTicketAction = (ticketData , token) => async dispatch => {
  try {
    dispatch({type : LOAD_CREATE_TICKET , payload : []})
    // config header 
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    } 
     const res = await axios.post("https://app.telefreik.com/api/v2/transports/buses/create-ticket" , ticketData , config )
     console.log(res)
     if(res.status === 200 ){
      dispatch({type : SUCCESS_CREATE_TICKET , payload : res.data.data})
     }

  } catch (error) {
    dispatch({ type: FAIL_CREATE_TICKET, payload: error.response.data.message });
  }
}

/**
* @doc create outbond and return  ticket action 
// @access private (just user can create ticket ) 
// Method POST 
*/
export const CreateReturnTicketAction = (ticketData , token) => async dispatch => {
  try {
    dispatch({type : LOAD_CREATE_RETURN_TICKET , payload : {}})
    // config header 
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    } 
     const res = await axios.post("https://app.telefreik.com/api/v2/transports/buses/create-ticket" , ticketData , config )
     dispatch({type : SUCCESS_CREATE_RETURN_TICKET , payload : res.data.data})



  } catch (error) {
    if (error.response && error.response.status === 400) {
      dispatch({ type: FAIL_CREATE_TICKET, payload: error.response.data.message });
    } else {
      dispatch({ type: FAIL_CREATE_RETURN_TICKET, payload: 'An error occurred while creating the ticket.' });
    }
  }
}


// payment action 
export const paymentAction = (uuid , token ) => async dispatch => {
  try {
    dispatch({type : LOAD_PAYMENT , payload : {} })
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    } 
    const res = await axios.post(`https://app.telefreik.com/api/v2/transports/orders/${uuid}/pay` , config)
    if(res.status === 200 ){
      dispatch({type : SUCCESS_PAYMENT , payload : res.data.data })
    }
  } catch (error) {
    dispatch({type : FAIL_PAYMENT , payload : error.response.data.message })
  }
}

// store outbond ticket data before create round trip 

const STORE_FIRST_TICKET = "STORE_FIRST_TICKET"  

export const StoreFirstTicketDataAction = (data) => async dispatch => {
      dispatch({type : STORE_FIRST_TICKET , payload : data })
}

// store end date 
const STORE_SEARCH_DATA = "STORE_SEARCH_DATA" 
export const StoreSearchDataAction = (searchData) => async dispatch => {
  dispatch({type : STORE_SEARCH_DATA , payload : searchData})
}