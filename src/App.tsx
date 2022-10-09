import React, { useRef } from "react";
import { Canvas } from "components/Canvas";
import { Flex } from "@chakra-ui/react";
import { Tools } from "components/Tools";
import { Zoom } from "components/Tools/Zoom";
import { useUndo } from "components/Canvas/useUndo";

const App = () => {
  const ctxRef = useRef<CanvasRenderingContext2D>(null!);
  const { undo, redo, snapshot, clear, isDisableUndo, isDisableRedo } = useUndo(
    ctxRef.current
  );
  return (
    <Flex>
      <Flex alignItems={"center"}>
        <Tools
          handlers={{
            undo,
            redo,
            clear,
            isDisableUndo,
            isDisableRedo,
          }}
        />
      </Flex>
      <Flex
        m={4}
        gap={4}
        flexDirection={"row"}
        style={{ position: "absolute", zIndex: 1 }}
      >
        <Zoom />
      </Flex>
      <Canvas ctxRef={ctxRef} snapshot={snapshot} />
    </Flex>
  );
};

export default App;
