import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { Reducers } from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import {persistStore , persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key : 'main-root' ,
    storage
}
const perseistReducer = persistReducer(persistConfig , Reducers)
const middelware = [thunk]
const store = createStore(perseistReducer , 
    composeWithDevTools( applyMiddleware(...middelware))
   )
const persistStor = persistStore(store) 
export{persistStor}
export default store