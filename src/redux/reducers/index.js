import {combineReducers} from 'redux' 
import { cityReducer , busSearch , SingleTrip , AvilableSeatsReducer} from './bus_travel_reducers/bus_travel_reducers'
import {LoginReducer , otpReducer} from './User/User'

export const Reducers = combineReducers({
    cityReducer,
    busSearch,
    SingleTrip,
    AvilableSeatsReducer,
    LoginReducer ,
    otpReducer
})