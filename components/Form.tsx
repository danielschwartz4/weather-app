import {
  Box,
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/core";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DataType, DayType, TimeType } from "../types";
import { buildData, getDayItem, getPageDates } from "../utils";

interface FormProps {
  address: string;
  day: DayType;
  time: TimeType;
  saved: boolean;
  errors: boolean;
  setAddress: Dispatch<SetStateAction<string>>;
  setDay: Dispatch<SetStateAction<DayType>>;
  setTime: Dispatch<SetStateAction<TimeType>>;
  setSaved: Dispatch<SetStateAction<boolean>>;
}

export const Form: React.FC<FormProps> = ({
  address,
  day,
  time,
  saved,
  errors,
  setDay,
  setAddress,
  setTime,
  setSaved,
}) => {
  return (
    <Box display={["block", "flex"]} justifyContent={"space-between"}>
      <Box>
        <Flex alignItems={"center"}>
          <Flex>
            <Box marginLeft={["", "2em", "4em"]}>
              <Text>Location</Text>
              <Input
                border={"1px"}
                borderColor={errors ? "tomato" : ""}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                placeholder="(e.g. 90210, Chicago, Florida)"
              />
            </Box>
            <Button
              marginTop={"auto"}
              marginLeft={["0.5em", "1em"]}
              onClick={() => {
                if (address) {
                  setSaved(!saved);
                }
              }}
            >
              Save
            </Button>
          </Flex>
        </Flex>
        {errors ? (
          <Text color={"tomato"} marginLeft={["", "2em", "4em"]}>
            Invalid address
          </Text>
        ) : null}
      </Box>

      <Flex marginTop={["2em", "auto"]} marginX={["", "2em", "4em"]}>
        <Box marginRight={["0.5em", "1em"]}>
          <Text>Day</Text>
          <Menu>
            <MenuButton as={Button}>{day}</MenuButton>
            <MenuList
              onClick={(e) => {
                const html = e.target as HTMLElement;
                setDay(html.innerHTML as DayType);
              }}
            >
              <MenuItem>Sunday</MenuItem>
              <MenuItem>Monday</MenuItem>
              <MenuItem>Tuesday</MenuItem>
              <MenuItem>Wednesday</MenuItem>
              <MenuItem>Thursday</MenuItem>
              <MenuItem>Friday</MenuItem>
              <MenuItem>Saturday</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box marginX={["0.5em", "1em"]}>
          <Text>Time</Text>
          <Menu>
            <MenuButton as={Button}>{time}</MenuButton>
            <MenuList
              onClick={(e) => {
                const html = e.target as HTMLElement;
                setTime(html.innerHTML as TimeType);
              }}
            >
              <MenuItem>Morning</MenuItem>
              <MenuItem>Afternoon</MenuItem>
              <MenuItem>Evening</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};
