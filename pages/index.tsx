import { Box, Button, Flex, Text } from "@chakra-ui/core";
import { useEffect, useState } from "react";
import { Form } from "../components/Form";
import { WeatherCard } from "../components/WeatherCard";
import { DataType, DayType, TimeType } from "../types";
import { getPageDates, getDayItem, buildData } from "../utils";

const IndexPage = () => {
  const [address, setAddress] = useState<string>("90210");
  const [day, setDay] = useState<DayType>("Monday");
  const [time, setTime] = useState<TimeType>("Morning");
  const [data, setData] = useState<DataType[]>();
  const [itemsIdx, setItemsIdx] = useState<number>(0);
  const [saved, setSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [date1, date2] = getPageDates(day, itemsIdx);
      // ideally I'd load in more than two days on first render and store them all in the state, but I'm getting rate-limited by the weather API and can't test this
      const weatherData1 = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${address}/${date1}/?key=${process.env.NEXT_PUBLIC_VC_API_KEY}`
      );
      const weatherData2 = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${address}/${date2}?key=${process.env.NEXT_PUBLIC_VC_API_KEY}`
      );
      if (weatherData1.status !== 200 || weatherData2.status !== 200) {
        setErrors(true);
        return;
      }
      console.log("YOOYOY", weatherData1);
      const res1 = await weatherData1.json();
      const res2 = await weatherData2.json();
      const chartData1 = buildData(res1, time);
      const chartData2 = buildData(res2, time);
      console.log(res1);
      setData([chartData1, chartData2]);
      setLoading(false);
      setErrors(false);
    };
    fetchData();
  }, [saved, day, time, itemsIdx]);

  console.log(errors);

  return (
    <Box
      justifyContent={"center"}
      width={["400px", "700px", "1000px"]}
      margin={"auto"}
      alignItems={"center"}
      padding={["2em", "4em", "6em"]}
    >
      <Form
        address={address}
        day={day}
        time={time}
        saved={saved}
        errors={errors}
        setAddress={setAddress}
        setDay={setDay}
        setTime={setTime}
        setSaved={setSaved}
      />
      {data && !errors ? (
        <Box>
          <Box
            marginY={"1em"}
            alignItems={"center"}
            display={["block", "flex"]}
          >
            <Text fontWeight={400} color={"grey"}>
              Weather in {data[0]?.resolvedAddress}
            </Text>
            <Flex
              // marginBottom={["2em", ""]}
              marginLeft={"auto"}
              alignItems={"center"}
            >
              <Button
                background={"white"}
                border={"1px"}
                onClick={() => setItemsIdx(itemsIdx - 2)}
              >
                Skip backward
              </Button>
              <Button
                background={"white"}
                border={"1px"}
                onClick={() => setItemsIdx(itemsIdx + 2)}
                marginLeft={"1em"}
              >
                Skip forward
              </Button>
            </Flex>
          </Box>
          <Box display={["block", "flex"]} justifyContent={"space-between"}>
            {!loading ? (
              <>
                <Box marginBottom={["2em", ""]}>
                  <WeatherCard
                    address={address}
                    day={day}
                    time={time}
                    data={data[0]}
                  />
                </Box>
                <Box>
                  <WeatherCard
                    address={address}
                    day={day}
                    time={time}
                    data={data[1]}
                  />
                </Box>
              </>
            ) : (
              "Loading..."
            )}
          </Box>
        </Box>
      ) : (
        //
        <></>
      )}
    </Box>
  );
};

export default IndexPage;
