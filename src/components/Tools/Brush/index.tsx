import { Box, Flex } from "@chakra-ui/react";
import { BrushWidthButton } from "@components/Tools/Brush/BrushWidthButton";
import { brushAtom } from "@state/Tools";
import { useAtom } from "jotai";
import type React from "react";

export const Brush: React.FC = () => {
	const [brush, setBrush] = useAtom(brushAtom);
	const handleClick = (width: number) => {
		setBrush((prev) => ({ ...prev, width }));
	};

	return (
		<Flex flexDirection={"column"} gap={4}>
			<Box>線の太さ</Box>
			<Flex justifyContent={"space-between"}>
				<BrushWidthButton
					currentWidth={brush.width}
					size={5}
					handleClick={() => handleClick(5)}
				/>
				<BrushWidthButton
					currentWidth={brush.width}
					size={10}
					handleClick={() => handleClick(10)}
				/>
				<BrushWidthButton
					currentWidth={brush.width}
					size={15}
					handleClick={() => handleClick(15)}
				/>
			</Flex>
		</Flex>
	);
};
