import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Bus_page } from "./screens/Bus_page/Bus_page";
import { Not_found } from "./screens/Not_found/Not_found";
import {BookingChaire} from "./screens/Bus_page/bookingChaire"

function App() {
  const router = [
    {
      path : "/",
      element : <Header />
    },
    {
      path : "/about",
      element : <Header />
    },
    {
      path : "/services",
      element : <Header />
    }
  ]
  return (
   <>
    <Router>
      <Routes>
        {
          router.map(route => {
            return <Route  path={route.path} element={route.element} />
          })
        }
        <Route path="/busTrips" element={<Bus_page /> } >
        </Route>
        <Route path="busTrips/:BusId" element={<BookingChaire />} />

        <Route path="*" element={<Not_found /> } ></Route>
      </Routes>

    </Router>
   </>
  );
}

export default App;
