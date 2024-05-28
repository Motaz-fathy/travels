import { combineReducers } from "redux";
import {
  cityReducer,
  busSearch,
  SingleTrip,
  AvilableSeatsReducer,
  CreateTicketReducer,
  CreateReturnTicketReducer,
  StoreFirstTicketDate,
  StoreSearchDataReduce,
  paymentReducer
} from "./bus_travel_reducers/bus_travel_reducers";
import {
  LoginReducer,
  otpReducer,
  tripReducer,
  RegisterReducer,
  DeleteAccReducer,
  updateProfileReducer
} from "./User/User";
import {
  TicketReducer,
  createAddressReducer,
  getAddressReducer,
  deleteAddressReducer,
  updateAddressReducer,
  contactReducer
} from "./profile/profileReducer";
import { stepReducer, OurPartnerReducer } from "./Ui/UiReducers";
import {
  SearchCarReducer,
  singleCarReducer,
  createTicketCarReducer,
  getCarTicketsReducer
} from "./CarReducer/CarReducer";
export const Reducers = combineReducers({
  cityReducer,
  busSearch,
  SingleTrip,
  AvilableSeatsReducer,
  LoginReducer,
  otpReducer,
  CreateTicketReducer,
  TicketReducer,
  tripReducer,
  StoreSearchDataReduce,
  stepReducer,
  OurPartnerReducer,
  CreateReturnTicketReducer,
  StoreFirstTicketDate,
  paymentReducer,
  RegisterReducer,
  DeleteAccReducer,
  createAddressReducer,
  getAddressReducer,
  deleteAddressReducer,
  updateAddressReducer,
  SearchCarReducer,
  singleCarReducer,
  createTicketCarReducer,
  getCarTicketsReducer,
  updateProfileReducer,
  contactReducer
});
