import { Flex } from "@chakra-ui/react";
import { Collaboration } from "@components/Avatar";
import { CursorLayer } from "@components/Canvas/CursorLayer";
import { DrawLayer } from "@components/Canvas/DrawLayer";
import { useCursor } from "@components/Canvas/useCursor.ts";
import { useUndo } from "@components/Canvas/useUndo.ts";
import { Tools } from "@components/Tools";
import { Zoom } from "@components/Tools/Zoom";
import { useRef } from "react";

const App = () => {
	const ctxRef = useRef<CanvasRenderingContext2D>(null!);
	const cursorCtxRef = useRef<CanvasRenderingContext2D>(null!);
	const { undo, redo, snapshot, clear, isDisableUndo, isDisableRedo } = useUndo(
		ctxRef.current,
	);
	const { trackMouseMove } = useCursor(cursorCtxRef.current);

	return (
		<Flex>
			<Collaboration />
			<Tools
				handlers={{
					undo,
					redo,
					clear,
					isDisableUndo,
					isDisableRedo,
				}}
			/>
			<Zoom />
			<DrawLayer
				ctxRef={ctxRef}
				handleCursorMouseMove={trackMouseMove}
				snapshot={snapshot}
			/>
			<CursorLayer cursorCtxRef={cursorCtxRef} />
		</Flex>
	);
};

export default App;
