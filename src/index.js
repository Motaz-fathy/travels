import React from 'react';
import ReactDOM from 'react-dom/client';
import setupLocatorUI from "@locator/runtime";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store ,{persistStor} from './redux/store'
import {PersistGate} from 'redux-persist/integration/react'

if (process.env.NODE_ENV === "development") {
  setupLocatorUI();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}><PersistGate loading={null} persistor={persistStor}><App /></PersistGate></Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
