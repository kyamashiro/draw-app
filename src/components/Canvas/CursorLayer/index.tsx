import { CANVAS_HEIGHT, CANVAS_WIDTH, Z_INDEX } from "@constants/index.ts";
import type React from "react";

interface Props {
	cursorCtxRef: React.MutableRefObject<CanvasRenderingContext2D>;
}

export const CursorLayer: React.FC<Props> = ({ cursorCtxRef }) => {
	return (
		<canvas
			ref={(canvasElement: HTMLCanvasElement) => {
				if (canvasElement) {
					cursorCtxRef.current = canvasElement.getContext(
						"2d",
					) as CanvasRenderingContext2D;
				}
			}}
			width={CANVAS_WIDTH}
			height={CANVAS_HEIGHT}
			style={{ position: "absolute", zIndex: Z_INDEX.CURSOR_LAYER }}
		/>
	);
};
