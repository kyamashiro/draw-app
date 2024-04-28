import { Button } from "@chakra-ui/react";
import React from "react";

interface Props {
  currentWidth: number;
  size: number;
  handleClick: () => void;
}

export const BrushWidthButton: React.FC<Props> = ({
  size,
  handleClick,
  currentWidth,
}) => {
  return (
    <Button size={"sm"} onClick={handleClick} isActive={currentWidth === size}>
      <span
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: "black",
        }}
      />
    </Button>
  );
};
