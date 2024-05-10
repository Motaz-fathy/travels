import produce from "immer";
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
  LOAD_AVIALBLE_SEATS,
  GET_AVIALBLE_SEATS,
  FAILD_AVIALBLE_SEATS,
  LOAD_CREATE_TICKET,
  SUCCESS_CREATE_TICKET,
  FAIL_CREATE_TICKET
} from "../../actions/types";

// Initial state
const initialState = {
  loading: false,
  data: [],
  error: null
};

export const cityReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_CITIES_SCCESSE:
        draft.loading = true;
        draft.error = null;
        break;
      case GET_CITIES_SCCESSE:
        draft.loading = false;
        draft.data = action.payload;
        draft.error = null;
        break;
      case FAILD_CITIES_SCCESSE:
        draft.loading = false;
        draft.error = action.payload;
        break;
      default:
        break;
    }
  });
};

export const busSearch = (
  state = {
    loading: false,
    data: [],
    error: null
  },
  action
) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_SEARCH:
        draft.loading = true;
        draft.error = null;
        draft.data = [] ;
        break;
      case GET_SEARCH:
        draft.loading = false;
        draft.data = action.payload;
        draft.error = null;
        break;
      case FAILD_SEARCH:
        draft.loading = false;
        draft.error = action.payload;
        break;
      default:
        break;
    }
  });
};

export const SingleTrip = (
  state = {
    loading: false,
    trip: [],
    error: null
  },
  action
) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_SINGLE_TRIP:
        draft.loading = true;
        draft.error = null;
        break;

      case GET_SINGLE_TRIP:
        draft.loading = false;
        draft.trip = action.payload;
        draft.error = null;
        break;

      case FAILD_SINGLE_TRIP:
        draft.loading = false;
        draft.error = action.payload;
        break;
      default:
        break;
    }
  });
};

export const AvilableSeatsReducer = (
  state = {
    loading: false,
    seats: [],
    error: null
  },
  action
) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_AVIALBLE_SEATS:
        draft.loading = true;
        draft.error = null;
        break;

      case GET_AVIALBLE_SEATS:
        draft.loading = false;
        draft.seats = action.payload;
        draft.error = null;
        break;

      case FAILD_AVIALBLE_SEATS:
        draft.loading = false;
        draft.error = action.payload;
        break;
      default:
        break;
    }
  });
};

/**
 * @doc create ticket reducer 
 * @access private 
 * 
 */

export const CreateTicketReducer = (
  state = {
    loading: false,
    reservationTicket: {},
    error: null
  },
  action
) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_CREATE_TICKET:
        draft.loading = true;
        draft.error = null;
        break;
      case SUCCESS_CREATE_TICKET:
        draft.loading = false;
        draft.reservationTicket = action.payload;
        draft.error = null;
        break;
      case FAIL_CREATE_TICKET:
        draft.loading = false;
        draft.error = action.payload;
        break;

      default:
        break;
    }
  });
};
