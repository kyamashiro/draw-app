import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";
import { zoomAtom } from "@state/Tools";
import { useAtom } from "jotai";

const DEFAULT_SCALE = 1.0;
const SCALE_STEP = 0.5;
const MAX_SCALE = 2.0;
const MIN_SCALE = 0.4;

export const Zoom = () => {
  const [zoom, setZoom] = useAtom(zoomAtom);
  const zoomIn = () => setZoom(zoom + SCALE_STEP);
  const zoomOut = () => setZoom(zoom - SCALE_STEP);
  const reset = () => setZoom(DEFAULT_SCALE);

  return (
    <Flex
      zIndex={1}
      m={4}
      gap={4}
      flexDirection={"row"}
      position={"fixed"}
      alignSelf={"flex-end"}
      top={"94%"}
      left={0}
    >
      <Box>
        <IconButton
          icon={<BsZoomIn />}
          aria-label={"zoom-in"}
          onClick={zoomIn}
          isDisabled={zoom > MAX_SCALE}
        />
      </Box>
      <Box>
        <IconButton
          icon={<BsZoomOut />}
          aria-label={"zoom-out"}
          onClick={zoomOut}
          isDisabled={zoom < MIN_SCALE}
        />
      </Box>
      <Box>
        <Button onClick={reset}>リセット</Button>
      </Box>
    </Flex>
  );
};
