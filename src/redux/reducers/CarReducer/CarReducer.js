import produce from "immer";
import {
  LOAD_SEARCH_CAR,
  SUCCESS_SEARCH_CAR,
  FAIL_SEARCH_CAR,
  LOAD_SINGLE_CAR,
  SUCCESS_SINGLE_CAR,
  FAIL_SINGLE_CAR,
  LOAD_CREATE_TICKET_CAR,
  SUCCESS_CREATE_TICKET_CAR,
  FAIL_CREATE_TICKET_CAR,
  LOAD_CAR_TICKET,
  SUCCESS_CAR_TICKET,
  FAIL_CAR_TICKET,
  LOAD_CAR_LOCATION ,
  GET_CAR_LOCATION,
  FAILD_CAR_LOCATION
} from "../../actions/types";

export const carLocationReducer = (state =  {
  loading: false,
  data: [],
  error: null
}, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_CAR_LOCATION:
        draft.loading = true;
        draft.error = null;
        break;
      case GET_CAR_LOCATION:
        draft.loading = false;
        draft.data = action.payload;
        draft.error = null;
        break;
      case FAILD_CAR_LOCATION:
        draft.loading = false;
        draft.error = action.payload;
        break;
      default:
        break;
    }
  });
};

/**
 * @doc search car reducer 
 */
export const SearchCarReducer = (
  state = {
    loadingSearchCar: false,
    dataSearchCar: [],
    errorSearchCar: null
  },
  action
) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_SEARCH_CAR:
        draft.loadingSearchCar = true;
        draft.errorSearchCar = null;
        draft.dataSearchCar = [];
        break;
      case SUCCESS_SEARCH_CAR:
        draft.loadingSearchCar = false;
        draft.dataSearchCar = action.payload;
        draft.errorSearchCar = null;
        break;
      case FAIL_SEARCH_CAR:
        draft.loadingSearchCar = false;
        draft.errorSearchCar = action.payload;
        break;
      default:
        break;
    }
  });
};

/**
 * @doc single car reducer 
 */
export const singleCarReducer = (
  state = {
    loading: false,
    carTrip: {},
    error: null
  },
  action
) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_SINGLE_CAR:
        draft.loading = true;
        draft.error = null;
        draft.carTrip = {};
        break;
      case SUCCESS_SINGLE_CAR:
        draft.loading = false;
        draft.carTrip = action.payload;
        draft.error = null;
        break;
      case FAIL_SINGLE_CAR:
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
 */
export const createTicketCarReducer = (
  state = {
    loading: false,
    CarTicket: [],
    error: null
  },
  action
) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_CREATE_TICKET_CAR:
        draft.loading = true;
        draft.error = null;
        draft.CarTicket = [];
        break;
      case SUCCESS_CREATE_TICKET_CAR:
        draft.loading = false;
        draft.CarTicket = action.payload;
        draft.error = null;
        break;
      case FAIL_CREATE_TICKET_CAR:
        draft.loading = false;
        draft.error = action.payload;
        break;
      default:
        break;
    }
  });
};

export const getCarTicketsReducer = (
  state = {
    carLoading: false,
    carTicket: [],
    carError: null
  },
  action
) => {
  switch (action.type) {
    case LOAD_CAR_TICKET:
      return { carLoading: true, carTicket: [] };
    case SUCCESS_CAR_TICKET:
      return { carLoading: false, carTicket: action.payload };
    case FAIL_CAR_TICKET:
      return { carLoading: false, carError: action.payload };
    default:
      return { ...state };
  }
};
