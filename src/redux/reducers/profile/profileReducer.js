import produce from "immer";
import {
  LOAD_PROFILE_TICKET,
  SUCCESS_PROFILE_TICKET,
  FAIL_PROFILE_TICKET,
  LOAD_CREATE_ADDRESS,
  SUCCESS_CREATE_ADDRESS,
  FAIL_CREATE_ADDRESS,
  LOAD_GET_ADDRESS,
  SUCCESS_GET_ADDRESS,
  FAIL_GET_ADDRESS,
  LOAD_DELETE_ADDRESS,
  SUCCESS_DELETE_ADDRESS,
  FAIL_DELETE_ADDRESS,
  LOAD_UPDATE_ADDRESS,
  SUCCESS_UPDATE_ADDRESS,
  FAIL_UPDATE_ADDRESS,
  LOAD_CONTACT,
  SUCCESS_CONTACT,
  FAIL_CONTACT
} from "../../actions/types";

/**
 * ticket reducer 
 */

export const TicketReducer = (
  state = {
    loading: false,
    tickets: [],
    error: null
  },
  action
) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_PROFILE_TICKET:
        draft.loading = true;
        draft.error = null;
        break;
      case SUCCESS_PROFILE_TICKET:
        draft.loading = false;
        draft.tickets = action.payload;
        draft.error = null;
        break;

      case FAIL_PROFILE_TICKET:
        draft.loading = false;
        draft.error = action.payload;
        break;

      default:
        break;
    }
  });
};

// create address reducer

export const createAddressReducer = (
  state = {
    loadingCreate: false,
    messageCreate: null,
    errorCreate: null
  },
  action
) => {
  switch (action.type) {
    case LOAD_CREATE_ADDRESS:
      return { loadingCreate: true, messageCreate: null };
    case SUCCESS_CREATE_ADDRESS:
      return { loadingCreate: false, messageCreate: action.payload };
    case FAIL_CREATE_ADDRESS:
      return { loadingCreate: false, errorCreate: action.payload };
    default:
      return { ...state };
  }
};

// get address reducer 

export const getAddressReducer = (
    state = {
      loadingGet: false,
      addressList: [],
      errorGet: null
    },
    action
  ) => {
    switch (action.type) {
      case LOAD_GET_ADDRESS:
        return { loadingGet: true, addressList: [] };
      case SUCCESS_GET_ADDRESS:
        return { loadingGet: false, addressList: action.payload };
      case FAIL_GET_ADDRESS:
        return { loadingGet: false, errorGet: action.payload };
      default:
        return { ...state };
    }
  };

//   delete address reducer 

export const deleteAddressReducer = (
    state = {
      loadingDelete: false,
      deleteMessage: null,
      errorDelete: null
    },
    action
  ) => {
    switch (action.type) {
      case LOAD_DELETE_ADDRESS:
        return { loadingDelete: true, deleteMessage: null };
      case SUCCESS_DELETE_ADDRESS:
        return { loadingDelete: false, deleteMessage: action.payload };
      case FAIL_DELETE_ADDRESS:
        return { loadingDelete: false, errorDelete: action.payload };
      default:
        return { ...state };
    }
  };

  //   update address reducer 

export const updateAddressReducer = (
    state = {
      loadingUpdate: false,
      UpdateMessage: null,
      errorUpdate: null
    },
    action
  ) => {
    switch (action.type) {
      case LOAD_UPDATE_ADDRESS:
        return { loadingUpdate: true, UpdateMessage: null };
      case SUCCESS_UPDATE_ADDRESS:
        return { loadingUpdate: false, UpdateMessage: action.payload };
      case FAIL_UPDATE_ADDRESS:
        return { loadingUpdate: false, errorUpdate: action.payload , UpdateMessage: null };
      default:
        return { ...state };
    }
  };

  //   contact reducer 

  export const contactReducer = (
    state = {
      contactLoading: false,
      contactMessage: null,
      contactError: null
    },
    action
  ) => {
    switch (action.type) {
      case LOAD_CONTACT:
        return { contactLoading: true, contactMessage: null };
      case SUCCESS_CONTACT:
        return { contactLoading: false, contactMessage: action.payload };
      case FAIL_CONTACT:
        return { contactLoading: false, contactError: action.payload , contactMessage: null };
      default:
        return { ...state };
    }
  };  