import {trips} from './data'


console.log(trips);
  
  // Extracting all stations using map and flatMap
  const allStations = trips.flatMap(trip => [...trip.stations_from, ...trip.stations_to]);
  
  console.log(allStations);
  