import { Box, Button, Stack } from "@chakra-ui/react";
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
      justifyContent={"space-between"}
      flexDirection={"column"}
    >
      <Box>
        <Brush />
        <ColorPicker />
      </Box>
      <Box>
        <Button
          size={"sm"}
          width={"100%"}
          onClick={() => {
            document.dispatchEvent(new CustomEvent("clearCanvas"));
          }}
        >
          クリア
        </Button>
      </Box>
    </Stack>
  );
};
