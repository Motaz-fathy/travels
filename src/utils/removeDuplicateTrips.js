export const removeDuplicateTrips = (trips) => {
    // Use Set to store unique trip IDs
    const uniqueTripIds = new Set();
  
    // Filter trips to keep only unique ones based on their IDs
    const uniqueTrips = trips.filter(trip => {
      if (!uniqueTripIds.has(trip.id)) {
        uniqueTripIds.add(trip.id);
        return true;
      }
      return false;
    });
  
    return uniqueTrips;
  };
  