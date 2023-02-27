function convertTime(militaryTime) {
  // Split the military time string into hours, minutes, and seconds
  const [hours, minutes, seconds] = militaryTime.split(":").map(Number);

  // Convert hours to standard time format
  let standardHours = hours % 12;
  if (standardHours === 0) {
    standardHours = 12;
  }

  // Determine if it's AM or PM
  const amPm = hours < 12 ? "AM" : "PM";

  // Return the standard time string
  return `${standardHours}:${minutes.toString().padStart(2, "0")} ${amPm}`;
}

console.log(convertTime("23:00:00"));
