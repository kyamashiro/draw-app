import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { Z_INDEX } from "@constants/index.ts";
import { zoomAtom } from "@state/Tools";
import { useAtom } from "jotai";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";

const DEFAULT_SCALE = 1.0;
const SCALE_STEP = 0.1;
const MAX_SCALE = 2.0;
const MIN_SCALE = 0.4;

export const Zoom = () => {
	const [zoom, setZoom] = useAtom(zoomAtom);
	const zoomIn = () => setZoom(zoom + SCALE_STEP);
	const zoomOut = () => setZoom(zoom - SCALE_STEP);
	const reset = () => setZoom(DEFAULT_SCALE);

	window.addEventListener(
		"wheel",
		(e) => {
			if (e.ctrlKey) {
				e.preventDefault();
				if (e.deltaY < 0 && zoom < MAX_SCALE) {
					zoomIn();
				}
				if (e.deltaY > 0 && zoom > MIN_SCALE) {
					zoomOut();
				}
			}
		},
		{
			capture: true,
			passive: false,
		},
	);

	return (
		<Flex
			zIndex={Z_INDEX.TOOLS}
			position={"fixed"}
			bottom={2}
			left={0}
			m={4}
			gap={4}
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
				<Button onClick={reset}>{Math.trunc(100 * zoom)}%</Button>
			</Box>
		</Flex>
	);
};
