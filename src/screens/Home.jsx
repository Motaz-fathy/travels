import React, {  useState , useEffect} from "react";
import { Header } from "../components/Header/Header";
import { AboutTelefreikSection } from "../components/landingPageSections/AboutTelefreikSection";
import { OurPartener } from "../components/landingPageSections/OurPartener";
import { MobileStore } from "../components/landingPageSections/MobileStore";
import { YourTrips } from "../components/landingPageSections/YourTrips";
import { Footer } from "../components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setTripType } from "../redux/actions/user/User";
import { useDispatch, useSelector } from "react-redux";
import { restStep } from "../redux/actions/Ui/UiActions";
gsap.registerPlugin(ScrollTrigger);
export const Home = () => {
  // claculate scroll height in home page
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [bgColor, setBgColor] = useState('bg-gray-800');
  const dispatch = useDispatch()
  const {tripType} = useSelector(state => state.tripReducer)
  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);

      if (newScrollY >= 300 && newScrollY < 700) {
        setBgColor('bg-gray-800');
      } else if (newScrollY <= 1500 && newScrollY > 700) {
        setBgColor('bg-gray-200');
      } else if (newScrollY > 1500 ) {
        setBgColor('bg-gray-800');
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    dispatch(setTripType("oneWay"))
    dispatch(restStep(tripType))
  } , [])
  return (
    <div className={`w-full h-auto  flex flex-col overflow-hidden  ${bgColor}`}>
      <Header />
      <AboutTelefreikSection />
      <OurPartener />
      <MobileStore />
      <YourTrips />
      <Footer />
      
    </div>
  );
};
