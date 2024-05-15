export const getTimeString = (datetimeString) => {
    // Check if datetimeString is defined and not null
    if (!datetimeString) {
        throw new Error("Invalid datetime string");
    }

    // Split the string by space
    let parts = datetimeString.split(' ');

    // The time part will be the last two elements joined by a space
    let timePart = parts.slice(1).join(' ');

    return timePart;
};