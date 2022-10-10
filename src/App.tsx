import React, { useRef } from "react";
import { Canvas } from "components/Canvas";
import { Container, Flex, IconButton } from "@chakra-ui/react";
import { Tools } from "components/Tools";
import { useUndo } from "components/Canvas/useUndo";
import { SignInScreen } from "components/Auth";
import { Zoom } from "components/Tools/Zoom";
import { VscSignIn } from "react-icons/vsc";

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
        <Flex m={4} gap={4} position={"absolute"} zIndex={1}>
          <IconButton aria-label={"signin"} icon={<VscSignIn />} />
        </Flex>
        <Flex m={4} gap={4} position={"absolute"} zIndex={1}>
          <SignInScreen />
        </Flex>
        <Canvas ctxRef={ctxRef} snapshot={snapshot} />
      </Flex>
    </Container>
  );
};

export default App;
