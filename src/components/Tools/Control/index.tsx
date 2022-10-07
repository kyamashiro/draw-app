import React from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

interface Props {
  undo: () => void;
  redo: () => void;
  isDisableUndo: boolean;
  isDisableRedo: boolean;
}

export const Control: React.FC<Props> = ({
  undo,
  redo,
  isDisableUndo,
  isDisableRedo,
}) => {
  return (
    <Flex justifyContent={"space-between"}>
      <Box>
        <IconButton
          icon={<ArrowBackIcon />}
          aria-label={"undo"}
          onClick={undo}
          disabled={isDisableUndo}
        />
      </Box>
      <Box>
        <IconButton
          icon={<ArrowForwardIcon />}
          aria-label={"redo"}
          onClick={redo}
          disabled={isDisableRedo}
        />
      </Box>
    </Flex>
  );
};
