import { Box, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { Brush } from "components/Tools/Brush";
import { ColorPicker } from "components/Tools/ColorPicker";
import { ClearButton } from "components/Tools/ClearButton";
import { Control } from "components/Tools/Control";
import { UseUndo } from "components/Canvas/useUndo";

interface Props {
  handlers: Omit<UseUndo, "snapshot">;
}

export const Tools: React.FC<Props> = ({
  handlers: { undo, redo, clear, isDisableUndo, isDisableRedo },
}) => {
  return (
    <Flex>
      <Stack
        position={"fixed"}
        top={"25%"}
        left={0}
        w="150px"
        h="400px"
        rounded="base"
        boxShadow="md"
        backgroundColor={"white"}
        m={4}
        p={4}
        justifyContent={"space-between"}
        flexDirection={"column"}
        zIndex={1}
      >
        <Box>
          <Brush />
          <ColorPicker />
        </Box>
        <Box>
          <Control
            undo={undo}
            redo={redo}
            isDisableUndo={isDisableUndo}
            isDisableRedo={isDisableRedo}
          />
        </Box>
        <Box>
          <ClearButton onClick={clear} />
        </Box>
      </Stack>
    </Flex>
  );
};
