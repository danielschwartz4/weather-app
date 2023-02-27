import { Box } from "@chakra-ui/core";
import React from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from "recharts";

interface ChartProps {
  data: any;
}

export const Chart: React.FC<ChartProps> = ({ data }) => {
  return (
    <Box margin={"auto"}>
      {data.graphData.length ? (
        <AreaChart
          width={300}
          height={300}
          data={data.graphData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {/* Temp */}
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            {/* Humidity */}
            <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            {/* Wind */}
            <linearGradient id="colorWindspeed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#dd2c76" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#dd2c76" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" scale={"point"} />

          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorTemp)"
          />
          <Area
            type="monotone"
            dataKey="humidity"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorHumidity)"
          />
          <Area
            type="monotone"
            dataKey="windspeed"
            stroke="#dd2c76"
            fillOpacity={1}
            fill="url(#colorWindspeed)"
          />
        </AreaChart>
      ) : (
        "No hourly data for this day :("
      )}
    </Box>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  console.log(active, payload, label);
  return <Box>hello</Box>;
};
