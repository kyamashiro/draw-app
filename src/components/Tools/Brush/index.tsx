import React from "react";
import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { brushAtom } from "state/Tools";

export const Brush: React.FC = () => {
  const [brush, setBrush] = useAtom(brushAtom);
  return (
    <>
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
    </>
  );
};
