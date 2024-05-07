import {
	Box,
	Button,
	Flex,
	Input,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
	SimpleGrid,
} from "@chakra-ui/react";
import { brushAtom } from "@state/Tools";
import { useAtom } from "jotai";

const COLORS = {
	black: "#000",
	gray: "#495057",
	red: "#c92a2a",
	blue: "#364fc7",
	green: "#2b8a3e",
	orange: "#e67700",
} as const;
type HEX = `#${string}`;
export type Color = (typeof COLORS)[keyof typeof COLORS] | HEX;
export const INITIAL_COLOR: Color = COLORS.black;

export const ColorPicker = () => {
	const [{ color }, setBrush] = useAtom(brushAtom);

	return (
		<Popover variant="picker">
			<Box>線の色</Box>
			<Flex
				direction={"row"}
				alignItems={"center"}
				justifyContent={"space-between"}
				gap={2}
			>
				<Box>
					<PopoverTrigger>
						<Button
							aria-label={color}
							background={color}
							size={"sm"}
							borderRadius={3}
							borderWidth={1}
							borderColor={"gray"}
						/>
					</PopoverTrigger>
				</Box>
				<Box verticalAlign={"center"}>
					<Input
						size="sm"
						padding={2}
						borderRadius={3}
						placeholder="#FFFFFF"
						value={color}
						onChange={(e) =>
							setBrush((prev) => ({
								...prev,
								color: e.currentTarget.value as Color,
							}))
						}
					/>
				</Box>
			</Flex>
			<PopoverContent width="170px">
				<PopoverArrow bg={"white"} />
				<PopoverCloseButton color="white" />
				<PopoverBody height="120px">
					<SimpleGrid columns={5} spacing={2}>
						{Object.values(COLORS).map((c) => (
							<Button
								key={c}
								aria-label={c}
								background={c}
								height="22px"
								width="22px"
								padding={0}
								minWidth="unset"
								borderRadius={3}
								_hover={{ background: c }}
								onClick={() => {
									setBrush((prev) => ({ ...prev, color: c }));
								}}
							/>
						))}
					</SimpleGrid>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
};
