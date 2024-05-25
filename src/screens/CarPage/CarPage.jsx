import React from 'react'
import {Navbar} from '../../components/Navbar/Navbar'
import {Footer} from '../../components/Footer'
import { useSelector } from 'react-redux';
import { CarIcon } from "../../sheard/CarIcon";

export const CarPage = () => {
  const { loadingSearchCar , dataSearchCar , errorSearchCar } = useSelector(state => state.SearchCarReducer);
  console.log("dataSearchCar" , dataSearchCar)
  return (
    <div className='w-full flex flex-col items-center '>
        <Navbar />
         <div className='min-h-screen '>CarPage </div>
        <div className='w-full'>
         <Footer />
        </div>
    </div>
  )
}
