import { useDraw } from "@components/Canvas/useDraw.ts";
import type { Color } from "@components/Tools/ColorPicker";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	LEFT_BUTTON,
	RIGHT_BUTTON,
	Z_INDEX,
} from "@constants/index.ts";
import { brushAtom, zoomAtom } from "@state/Tools";
import { useAtom } from "jotai";
import type React from "react";
import { type MutableRefObject, useEffect, useState } from "react";

export interface MousePosition {
	x: number;
	y: number;
}

export interface LineData {
	shape: Path2D;
	color: Color;
	width: number;
}

interface Props {
	ctxRef: MutableRefObject<CanvasRenderingContext2D>;
	handleCursorMouseMove: (
		e: React.MouseEvent<HTMLCanvasElement>,
		ctxRef: CanvasRenderingContext2D,
	) => void;
	snapshot: (lineData: LineData) => void;
}

// eslint-disable-next-line react/display-name
export const DrawLayer: React.FC<Props> = ({
	ctxRef,
	handleCursorMouseMove,
	snapshot,
}) => {
	const [{ width, color }] = useAtom(brushAtom);
	const [scale] = useAtom(zoomAtom);
	const [isMouseLeftDown, setIsMouseLeftDown] = useState(false);
	const [isMouseRightDown, setIsMouseRightDown] = useState(false);
	const [cursor, setCursor] = useState("crosshair");
	let points: MousePosition[] = [];
	let beginPoint: MousePosition | undefined;
	const line = {
		shape: new Path2D(),
		color,
		width,
	};

	const { publishDrawPath, reflectOtherDrawing } = useDraw();

	reflectOtherDrawing(ctxRef.current);

	useEffect(() => {
		// 画面表示時にセンターにスクロール
		window.scrollTo(screen.width / 2, screen.height / 2);
	}, []);

	useEffect(() => {
		ctxRef.current.lineWidth = width;
		ctxRef.current.strokeStyle = color;
		ctxRef.current.fillStyle = color;
		ctxRef.current.shadowBlur = 0.5;
		ctxRef.current.shadowColor = color;
		ctxRef.current.lineJoin = "round";
		ctxRef.current.lineCap = "round";
	}, [color, width]);

	const getMousePosition = (
		canvas: HTMLCanvasElement,
		e: React.MouseEvent<HTMLCanvasElement>,
	) => {
		const rect = canvas.getBoundingClientRect();

		return {
			x: ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
			y: ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
		};
	};

	const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
		// 左右マウスを同時に押している場合は何もしない
		if (isMouseLeftDown || isMouseRightDown) return;

		const { x, y } = getMousePosition(ctxRef.current.canvas, e);
		points.push({ x, y });

		if (e.button === LEFT_BUTTON) {
			setIsMouseLeftDown(true);
			line.shape = new Path2D();
		} else if (e.button === RIGHT_BUTTON) {
			setIsMouseRightDown(true);
		}
	};

	const handleMouseUp = async () => {
		if (isMouseLeftDown) {
			snapshot(line);
		}
		setIsMouseLeftDown(false);
		setIsMouseRightDown(false);
		setCursor("crosshair");
		points = [];
	};

	const drawLine = (
		points: MousePosition[],
		beginPoint: MousePosition | undefined,
		ctx: CanvasRenderingContext2D,
		path: Path2D,
	): MousePosition | undefined => {
		if (points.length > 3) {
			const lastTwoPoints = points.slice(-2);
			const controlPoint = lastTwoPoints[0];
			const endPoint = {
				x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
				y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
			};

			if (beginPoint) {
				ctx.beginPath();
				ctx.lineWidth = width;
				ctx.strokeStyle = color;
				ctx.moveTo(beginPoint.x, beginPoint.y);
				ctx.bezierCurveTo(
					beginPoint.x,
					beginPoint.y,
					controlPoint.x,
					controlPoint.y,
					endPoint.x,
					endPoint.y,
				);
				ctx.stroke();

				path.moveTo(beginPoint.x, beginPoint.y);
				path.bezierCurveTo(
					beginPoint.x,
					beginPoint.y,
					controlPoint.x,
					controlPoint.y,
					endPoint.x,
					endPoint.y,
				);
			}
			return endPoint;
		}
	};

	let previousClientX: number;
	let previousClientY: number;

	const handleMouseMove = async (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (isMouseLeftDown) {
			const { x, y } = getMousePosition(ctxRef.current.canvas, e);
			points.push({ x, y });
			await publishDrawPath(points, line);
			beginPoint = drawLine(points, beginPoint, ctxRef.current, line.shape);
		}

		if (isMouseRightDown) {
			if (previousClientX && previousClientY) {
				window.scrollBy(
					previousClientX - e.clientX,
					previousClientY - e.clientY,
				);
			}
			previousClientX = e.clientX;
			previousClientY = e.clientY;
		}
	};

	const handleRightClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
		e.preventDefault();
		// マウスの左右を同時に押している場合
		if (isMouseLeftDown) return;
		setCursor("grabbing");
	};

	return (
		<canvas
			ref={(canvasElement: HTMLCanvasElement) => {
				if (canvasElement) {
					ctxRef.current = canvasElement.getContext(
						"2d",
					) as CanvasRenderingContext2D;
				}
			}}
			width={CANVAS_WIDTH}
			height={CANVAS_HEIGHT}
			style={{
				cursor,
				transformOrigin: "0 0",
				transform: `scale(${scale})`,
				position: "absolute",
				zIndex: Z_INDEX.DRAW_LAYER,
			}}
			onMouseDown={(e) => handleMouseDown(e)}
			onMouseUp={() => handleMouseUp()}
			onMouseMove={(e) => {
				handleMouseMove(e);
				handleCursorMouseMove(e, ctxRef.current);
			}}
			onContextMenu={(e) => handleRightClick(e)}
		/>
	);
};
