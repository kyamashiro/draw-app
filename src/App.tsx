import React, { useRef } from "react";
import { Canvas } from "components/Canvas";
import { Container, Flex } from "@chakra-ui/react";
import { Tools } from "components/Tools";
import { useUndo } from "components/Canvas/useUndo";
import { Zoom } from "components/Tools/Zoom";

const App = () => {
  const ctxRef = useRef<CanvasRenderingContext2D>(null!);
  const { undo, redo, snapshot, clear, isDisableUndo, isDisableRedo } = useUndo(
    ctxRef.current
  );

  return (
    <Container maxH={window.innerHeight} maxW={window.innerWidth}>
      <Flex>
        <Flex
          position={"absolute"}
          alignSelf={"center"}
          alignItems={"center"}
          align={"center"}
          alignContent={"center"}
        >
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
          zIndex={1}
          m={4}
          gap={4}
          flexDirection={"row"}
          position={"absolute"}
          alignSelf={"flex-end"}
        >
          <Zoom />
        </Flex>
        <Canvas />
      </Flex>
    </Container>
  );
};

export default App;
