import { Button } from "@chakra-ui/react";
import type React from "react";

export const ClearButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
	return (
		<Button size={"sm"} width={"100%"} onClick={onClick}>
			Reset
		</Button>
	);
};
