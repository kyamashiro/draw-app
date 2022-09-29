import { Stack } from "@chakra-ui/react";
import React from "react";
import { Brush } from "components/Tools/Brush";
import { ColorPicker } from "components/Tools/ColorPicker";

export const Tools: React.FC = () => {
  return (
    <Stack
      w="150px"
      h="400px"
      pos={"absolute"}
      rounded="base"
      boxShadow="md"
      backgroundColor={"white"}
      m={4}
      p={4}
    >
      <Brush />
      <ColorPicker />
    </Stack>
  );
};
