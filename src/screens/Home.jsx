import React, { useRef } from 'react'
import { Header } from '../components/Header/Header'
import { AboutTelefreikSection } from '../components/landingPageSections/AboutTelefreikSection'
import { OurPartener } from '../components/landingPageSections/OurPartener'
import { MobileStore } from '../components/landingPageSections/MobileStore'
import { YourTrips } from '../components/landingPageSections/YourTrips'
import { Footer } from '../components/Footer'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export const Home = () => {
  const mob = useRef(null)

  return (
    <div className='w-full h-auto bg-gray-200 flex flex-col overflow-hidden'>
        <Header />
        <AboutTelefreikSection />
        <OurPartener />
        <MobileStore />
        <YourTrips />
        <Footer />
    </div>
  )
}
