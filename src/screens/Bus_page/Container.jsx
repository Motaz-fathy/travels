import React from 'react'
import { BusTripCard } from './BusTripCard'
import { Loading } from '../../sheard/Loading'
export const Container = ({loading , currentTrips  , currentPage , paginate , tripsPerPage}) => {
  return (
    <>
         {loading ? <Loading /> :
        <>
        <div className="md:flex-col ">
        <div className="md:flex md:space-x-4 w-full mx-auto  ">
        <section className="w-full mx-auto px-4  grid grid-cols-2 sm:grid-cols-1 max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
        {currentTrips.length !== 0
        ? currentTrips.map((trip, index) =>
        <BusTripCard trip={trip} key={index} />
        )
        : <div className="w-full flex flex-col items-center gap-6  text-center ">
          <span className='text-2xl mx-auto fon-bold text-gray-800 Clip w-full bg-gray-100 py-10'> please press on previous !! </span>

          </div>}
        </section>
        </div>
        </div>
        <div className=" flex justify-center items-center gap-3 ">
        <button
        className={` w-40 h-10 my-3 rounded-md text-white ${currentPage === 1 ? 'bg-gray-400' : 'bg-gray-900 hover:bg-gray-800 transition-all duration-300'}`}
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        >
        Previous
        </button>
        <button
        className={` w-40 h-10 my-3 rounded-md text-white ${currentTrips.length < tripsPerPage ? 'bg-gray-400' : 'bg-gray-900 hover:bg-gray-800 transition-all duration-300'}`}
        onClick={() => paginate(currentPage + 1)}
        disabled={currentTrips.length < tripsPerPage}
        >
        Next
        </button>
        </div>
        </>
      }
    </>
  )
}
