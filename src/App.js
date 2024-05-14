import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Bus_page } from "./screens/Bus_page/Bus_page";
import { Not_found } from "./screens/Not_found/Not_found";
import { BookingChaire } from "./screens/Bus_page/bookingChaire";
import { Home } from "./screens/Home";
import { Login } from "./screens/AuthPages/Login";
import { Otp } from "./screens/AuthPages/Otp";
import { MainProfile } from "./screens/profile/MainProfile";
import { About } from './screens/About/About.jsx'
import { ContactUs } from './screens/Contact/ContactUs.jsx'
import { ReservationTicket } from "./screens/Bus_page/ReservationTicket.jsx";

function App() {
  const router = [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/about",
      element: <About />
    },
    {
      path: "/contact",
      element: <ContactUs />
    }
  ];
  return (
    <>
      <Router>
        <Routes>
          {router.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="/busTrips" element={<Bus_page />} />
          <Route path="/busTrips/:BusId" element={<BookingChaire />} />
          <Route path="/busTrips/:BusId/reservation-ticket" element={<ReservationTicket />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/profile" element={<MainProfile />} />

          <Route path="/*" element={<Not_found />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
