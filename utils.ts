import { DataItem, DataType, DayType, TimeType } from "./types";

export function getDayItem(day: DayType, idx: number) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const targetDayOfWeek = daysOfWeek.indexOf(day);
  let daysUntilTargetDayOfWeek: number;
  if (idx >= 0) {
    daysUntilTargetDayOfWeek = (7 + targetDayOfWeek - today.getDay()) % 7;
  } else {
    daysUntilTargetDayOfWeek = (7 + today.getDay() - targetDayOfWeek) % 7;
  }

  let targetTime;
  if (idx >= 0) {
    const daysToAdd = daysUntilTargetDayOfWeek + idx * 7;
    targetTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + daysToAdd
    );
  } else {
    const daysToSubtract = daysUntilTargetDayOfWeek + idx * -7;
    targetTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - daysToSubtract
    );
  }
  return targetTime;
}

export function getPageDates(day: DayType, item: number) {
  return [
    getDayItem(day, item).toISOString(),
    getDayItem(day, item + 1).toISOString(),
  ];
}

export function buildData(data: any, time: TimeType) {
  const res = {} as DataType;
  const day = data?.days[0];
  res.resolvedAddress = data?.resolvedAddress;
  res.icon = day.icon;
  res.description = day.description;
  res.conditions = day.conditions;
  res.datetime = day.datetime;
  res.windspeed = day.windspeed;
  res.precipprob = day.precipprob;
  res.temp = day.temp;
  let hrs: DataItem[] = [];
  const [start, end] =
    time === "Morning" ? [8, 13] : time === "Afternoon" ? [13, 17] : [17, 21];

  for (let i = start; i < end; i++) {
    if (data?.days[0]?.hours) {
      const hour = data?.days[0]?.hours[i];
      const tmp = {
        name: convertTime(hour.datetime),
        temp: hour.temp,
        humidity: hour.humidity,
        windspeed: hour.windspeed,
      };
      hrs.push(tmp);
    }
  }
  res.graphData = hrs;

  return res;
}

function convertTime(militaryTime: string) {
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
