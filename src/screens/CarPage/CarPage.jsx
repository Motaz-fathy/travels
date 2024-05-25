import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer';
import { useSelector } from 'react-redux';
import { CarHeader } from './CarHeader';
import { CarFilters } from './CarFilters';
import { ContainerCar } from './ContainerCar';

export const CarPage = () => {
  const { loadingSearchCar, dataSearchCar, errorSearchCar } = useSelector(
    (state) => state.SearchCarReducer
  );

  const [modifyTrips, setModifyTrips] = useState([]);

  useEffect(() => {
    setModifyTrips(dataSearchCar);
  }, [dataSearchCar]);

  return (
    <div className='w-full flex flex-col bg-gray-200'>
      <Navbar />
      <CarHeader trip={modifyTrips[0]} />
      <div className='min-h-auto w-full flex justify-between items-start my-10 px-8 max-md:px-2 max-md:flex-col'>
        <CarFilters
          setModifyTrips={setModifyTrips}
          dataSearchCar={dataSearchCar.length > 0 && dataSearchCar}
        />
        <ContainerCar modifyTrips={modifyTrips} />
      </div>
      {/* Footer */}
      <div className='w-full'>
        <Footer />
      </div>
    </div>
  );
};
