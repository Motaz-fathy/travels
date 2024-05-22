import { combineReducers } from "redux";
import {
  cityReducer,
  busSearch,
  SingleTrip,
  AvilableSeatsReducer,
  CreateTicketReducer,
  CreateReturnTicketReducer,
  StoreFirstTicketDate,
  StoreEndDateReduce,
  paymentReducer
} from "./bus_travel_reducers/bus_travel_reducers";
import { LoginReducer, otpReducer, tripReducer } from "./User/User";
import { TicketReducer } from "./profile/profileReducer";
import { stepReducer, OurPartnerReducer } from "./Ui/UiReducers";
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
  StoreEndDateReduce,
  stepReducer,
  OurPartnerReducer,
  CreateReturnTicketReducer,
  StoreFirstTicketDate,
  paymentReducer
});
