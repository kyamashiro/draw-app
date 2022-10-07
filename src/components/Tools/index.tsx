import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import { Brush } from "components/Tools/Brush";
import { ColorPicker } from "components/Tools/ColorPicker";
import { ClearButton } from "components/Tools/ClearButton";
import { Control } from "components/Tools/Control";
import { UseUndo } from "components/Canvas/useUndo";

interface Props {
  ctx: CanvasRenderingContext2D;
  handlers: Omit<UseUndo, "snapshot">;
}

export const Tools: React.FC<Props> = ({
  ctx,
  handlers: { undo, redo, clear, isDisableUndo, isDisableRedo },
}) => {
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
        <Control
          undo={() => undo(ctx)}
          redo={() => redo(ctx)}
          isDisableUndo={isDisableUndo}
          isDisableRedo={isDisableRedo}
        />
      </Box>
      <Box>
        <ClearButton onClick={() => clear(ctx)} />
      </Box>
    </Stack>
  );
};
