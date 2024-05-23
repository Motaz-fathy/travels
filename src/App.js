import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Bus_page } from "./screens/Bus_page/Bus_page";
import { NotFound } from "./screens/NotFound/NotFound.jsx";
import { BookingChaire } from "./screens/Bus_page/bookingChaire";
import { Home } from "./screens/Home";
import { Login } from "./screens/AuthPages/Login";
import {Register} from './screens/AuthPages/Register.jsx'
import { Otp } from "./screens/AuthPages/Otp";
import { MainProfile } from "./screens/profile/MainProfile";
import { About } from "./screens/About/About.jsx";
import { ContactUs } from "./screens/Contact/ContactUs.jsx";
import { ReservationTicket } from "./screens/Bus_page/ReservationTicket.jsx";
import { BookingChaireRoundTrip } from "./screens/Bus_page/BookingChaireRoundTrip.jsx";
import { ProtectedRoute, PublicRoute } from "./utils/PublicProtectRoutes.jsx";

function App() {
  const { tripType } = useSelector(state => state.tripReducer);

  const routes = [
    { path: "/", element: Home, protected: false },
    { path: "/about", element: About, protected: false },
    { path: "/contact", element: ContactUs, protected: false },
    { path: "/busTrips", element: Bus_page, protected: false },
    {
      path: "/busTrips/:BusId",
      element: tripType === "oneWay" ? BookingChaire : BookingChaireRoundTrip,
      protected: true
    },
    {
      path: "/busTrips/:BusId/reservation-ticket",
      element: ReservationTicket,
      protected: true
    },
    { path: "/login", element: Login, protected: false },
    { path: "/register", element: Register, protected: false },
    { path: "/otp", element: Otp, protected: false },
    { path: "/profile", element: MainProfile, protected: true },
    { path: "*", element: NotFound, protected: false }
  ];

  return (
    <Router>
      <Routes>
        {routes.map(({ path, element: Component, protected: isProtected }) =>
          <Route
            key={path}
            path={path}
            element={
              isProtected
                ? <ProtectedRoute element={Component} />
                : <PublicRoute element={Component} />
            }
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;
