import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useAtom } from "jotai";
import { brushAtom } from "state/Tools";

export const Tools: React.FC = () => {
  const [brush, setBrush] = useAtom(brushAtom);

  return (
    <Stack
      w="150px"
      h="400px"
      pos={"absolute"}
      rounded="base"
      boxShadow="md"
      backgroundColor={"white"}
      m={4}
    >
      <Box p={6}>
        <Box>線の太さ</Box>
        <Box pt={6} px={4}>
          <Slider
            aria-label="slider-ex-6"
            min={1}
            max={100}
            onChange={(size) => {
              setBrush((prev) => ({ ...prev, size }));
            }}
          >
            <SliderMark
              value={brush.size}
              textAlign="center"
              bg="blue.500"
              color="white"
              mt="-10"
              ml="-5"
              w="12"
            >
              {brush.size}%
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      </Box>
    </Stack>
  );
};
