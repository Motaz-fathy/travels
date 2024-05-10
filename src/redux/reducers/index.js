import {combineReducers} from 'redux' 
import { cityReducer , busSearch , SingleTrip , AvilableSeatsReducer , CreateTicketReducer} from './bus_travel_reducers/bus_travel_reducers'
import {LoginReducer , otpReducer} from './User/User'
import { TicketReducer } from './profile/profileReducer'

export const Reducers = combineReducers({
    cityReducer,
    busSearch,
    SingleTrip,
    AvilableSeatsReducer,
    LoginReducer ,
    otpReducer,
    CreateTicketReducer ,
    TicketReducer
})