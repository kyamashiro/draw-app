import { Box, Flex } from "@chakra-ui/react";
import { BrushWidthButton } from "@components/Tools/Brush/BrushWidthButton";
import { BRUSH_WIDTHS, brushAtom } from "@state/Tools";
import { useAtom } from "jotai";
import type React from "react";

export const Brush: React.FC = () => {
	const [brush, setBrush] = useAtom(brushAtom);
	const handleClick = (width: number) => {
		setBrush((prev) => ({ ...prev, width }));
	};

	return (
		<Flex flexDirection={"column"} gap={4}>
			<Box>Width</Box>
			<Flex justifyContent={"space-between"}>
				<BrushWidthButton
					currentWidth={brush.width}
					size={5}
					handleClick={() => handleClick(BRUSH_WIDTHS.SMALL)}
				/>
				<BrushWidthButton
					currentWidth={brush.width}
					size={10}
					handleClick={() => handleClick(BRUSH_WIDTHS.MEDIUM)}
				/>
				<BrushWidthButton
					currentWidth={brush.width}
					size={15}
					handleClick={() => handleClick(BRUSH_WIDTHS.LARGE)}
				/>
			</Flex>
		</Flex>
	);
};
