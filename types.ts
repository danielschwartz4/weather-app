export type DayType =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type TimeType = "Morning" | "Afternoon" | "Evening";

export interface DataType {
  resolvedAddress: string;
  icon: string;
  description: string;
  conditions: string;
  datetime: string;
  windspeed: number;
  precipprob: number;
  temp: number;
  graphData: DataItem[];
}

export type DataItem = {
  name: string;
  temp: number;
  humidity: number;
  windspeed: string;
};
