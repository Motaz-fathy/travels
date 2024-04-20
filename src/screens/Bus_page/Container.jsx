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
        <section className="w-full mx-auto px-4  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2 ">
        {currentTrips.length !== 0
        ? currentTrips.map((trip, index) =>
        <BusTripCard trip={trip} key={index} />
        )
        : <div className="px-10">No trips in this time</div>}
        </section>
        </div>
        </div>
        <div className=" flex justify-center items-center gap-3 ">
        <button
        className={` w-40 h-10 my-3 rounded-md text-white ${currentPage === 1 ? 'bg-gray-400' : 'bg-gray-800'}`}
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        >
        Previous
        </button>
        <button
        className={` w-40 h-10 my-3 rounded-md text-white ${currentTrips.length < tripsPerPage ? 'bg-gray-400' : 'bg-gray-800'}`}
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
