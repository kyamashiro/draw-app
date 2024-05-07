import { Box, Flex, Stack } from "@chakra-ui/react";
import type { UseUndo } from "@components/Canvas/useUndo";
import { Brush } from "@components/Tools/Brush";
import { ClearButton } from "@components/Tools/ClearButton";
import { ColorPicker } from "@components/Tools/ColorPicker";
import { Control } from "@components/Tools/Control";
import { Z_INDEX } from "@constants/index.ts";
import type React from "react";

interface Props {
	handlers: Omit<UseUndo, "snapshot">;
}

export const Tools: React.FC<Props> = ({
	handlers: { undo, redo, clear, isDisableUndo, isDisableRedo },
}) => {
	return (
		<>
			<Stack
				position={"fixed"}
				top={300}
				left={0}
				w="150px"
				h="400px"
				rounded="base"
				boxShadow="md"
				backgroundColor={"white"}
				m={4}
				p={4}
				justifyContent={"space-between"}
				flexDirection={"column"}
				zIndex={Z_INDEX.TOOLS}
			>
				<Flex gap={4} flexDirection={"column"}>
					<Brush />
					<ColorPicker />
				</Flex>
				<Box>
					<Control
						undo={undo}
						redo={redo}
						isDisableUndo={isDisableUndo}
						isDisableRedo={isDisableRedo}
					/>
				</Box>
				<Box>
					<ClearButton onClick={clear} />
				</Box>
			</Stack>
		</>
	);
};
