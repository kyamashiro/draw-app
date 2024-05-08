import { supabase } from "@client/supabase.ts";
import { drawCursor } from "@components/Canvas/CursorLayer/util.ts";
import type { MousePosition } from "@components/Canvas/DrawLayer";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@constants/index.ts";
import { type User, meAtom, usersAtom } from "@state/User";
import { throttle } from "@utils/index.ts";
import { useAtomValue } from "jotai/index";
import type React from "react";

export interface UseCursor {
	trackMouseMove: (
		e: React.MouseEvent<HTMLCanvasElement>,
		ctx: CanvasRenderingContext2D,
	) => void;
}

interface Cursor {
	user: User;
	position: MousePosition;
}

type Props = (cursorLayerCtx: CanvasRenderingContext2D) => UseCursor;

export const useCursor: Props = (cursorLayerCtx) => {
	const cursors: Map<string, MousePosition> = new Map();
	const me = useAtomValue(meAtom);
	const users = useAtomValue(usersAtom);

	const channel = supabase.channel("cursor", {
		config: {
			presence: {
				key: me.id,
			},
		},
	});
	channel.subscribe();

	const trackMouseMove = throttle(
		async (
			e: React.MouseEvent<HTMLCanvasElement>,
			ctx: CanvasRenderingContext2D,
		): Promise<void> => {
			// マウスの位置を取得
			const mouseX = e.clientX - ctx.canvas.getBoundingClientRect().left;
			const mouseY = e.clientY - ctx.canvas.getBoundingClientRect().top;
			await channel.send({
				type: "broadcast",
				event: "cursor",
				payload: {
					user: me,
					position: { x: mouseX, y: mouseY },
				},
			});
		},
		120,
	);

	channel.on<Cursor>("broadcast", { event: "cursor" }, ({ payload }) => {
		cursors.set(payload.user.id, payload.position);
		if (!cursorLayerCtx) return;
		cursorLayerCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		[...cursors.keys()].map((key) => {
			const cursor = cursors.get(key);
			const user = users.get(key);
			if (cursor && user) {
				requestAnimationFrame(() => drawMouseCursor(cursor.x, cursor.y, user));
			}
		});
	});

	const drawMouseCursor = (x: number, y: number, user: User) => {
		cursorLayerCtx.beginPath();
		drawCursor(cursorLayerCtx, x, y, x - 5, y - 20, [0, 2, -15, 2, -15, 6]);
		cursorLayerCtx.closePath();
		cursorLayerCtx.fillStyle = user.color; // マウスの形の色
		cursorLayerCtx.fill();
		cursorLayerCtx.font = "16px";
		cursorLayerCtx.fillText(user.name, x + 10, y);
	};

	return { trackMouseMove };
};
