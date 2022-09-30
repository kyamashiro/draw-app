import { Button } from "@chakra-ui/react";
import React from "react";

export const ClearButton = () => {
  return (
    <Button
      size={"sm"}
      width={"100%"}
      onClick={() => {
        document.dispatchEvent(new CustomEvent("clearCanvas"));
      }}
    >
      クリア
    </Button>
  );
};
