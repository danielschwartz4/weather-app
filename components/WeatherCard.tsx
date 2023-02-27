import {
  Box,
  Flex,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import night from "../images/night.png";
import { DataType, DayType, TimeType } from "../types";
import { Chart } from "./Chart";

interface WeatherCardProps {
  address: string;
  day: DayType;
  time: TimeType;
  data: DataType;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  address,
  day,
  time,
  data,
}) => {
  const [image, setImage] = useState<any>();
  useEffect(() => {
    if (data && data.icon) {
      const img = require("../images/" + data.icon + ".svg");
      setImage(img);
    }
  }, [data]);

  return (
    <Stack
      padding={"1em"}
      borderRadius={"8px"}
      borderColor={"red"}
      color={"red"}
      border={"1px"}
      spacing={"1em"}
      width={"350px"}
    >
      <Box margin={"auto"} color={"red"} fontWeight={500}>
        {day} {time} ({data?.datetime})
      </Box>
      <Flex justifyContent={"space-between"}>
        <Popover trigger="hover">
          <PopoverTrigger>
            <img
              src={image ? image.default.src : null}
              alt={night.src}
              style={{ height: "75px", maxWidth: "100px" }}
            />
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>
                <Text>{data?.conditions}</Text>
              </PopoverHeader>
              <PopoverCloseButton />
            </PopoverContent>
          </Portal>
        </Popover>
        <Box>
          <Text>🌡 Temp: {data?.temp}&#176;F</Text>
          <Text>💨 Winds: {data?.windspeed} MPH</Text>
          <Text>🌧 {data?.precipprob}% chance of rain </Text>
        </Box>
      </Flex>
      <Box textAlign={"center"} margin={"auto"}>
        <Text>{data?.description}</Text>
      </Box>
      <Chart data={data}></Chart>
    </Stack>
  );
};
