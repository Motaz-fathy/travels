export function convertTime(selectedTime) {
    // Parse the selected time string into a Date object
    const date = new Date(selectedTime);

    // Get hours and minutes from the Date object
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format hours and minutes to ensure they're always two digits
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    // Return the formatted time string
    return `${formattedHours}:${formattedMinutes}`;
}


