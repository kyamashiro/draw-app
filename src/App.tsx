import React from "react";
import { Canvas } from "components/Canvas";
import { Tools } from "components/Tools";
import { Flex } from "@chakra-ui/react";

const App = () => {
  return (
    <Flex alignItems={"center"}>
      <Tools />
      <Canvas />
    </Flex>
  );
};

export default App;
