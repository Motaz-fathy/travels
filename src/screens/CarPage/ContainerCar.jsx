import React from 'react'
import {CarCard} from './CarCard'
export const ContainerCar = ({modifyTrips}) => {
  return (
    <div className=' w-3/4  flex flex-col items-center gap-2 max-md:w-full'>
     <div className='w-full mx-auto px-0  max-md:px-0 grid grid-cols-2 sm:grid-cols-1 max-md:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2'>

       {modifyTrips.map((item , index ) => {
        return <CarCard item={item} key={index}/>
       } ) }

     </div>    
    </div>
  )
}
