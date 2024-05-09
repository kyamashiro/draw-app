import { supabase } from "@client/supabase.ts";
import type { LineData, MousePosition } from "@components/Canvas/DrawLayer";
import { debounce } from "@utils/index.ts";

export const useDraw = () => {
	const channel = supabase.channel("draw-path");
	channel.subscribe();

	const publishDrawPath = debounce(
		async (points: MousePosition[], lineData: LineData) => {
			console.log("draw-path");
			await channel.send({
				type: "broadcast",
				event: "draw-path",
				payload: JSON.stringify({
					points,
					lineData,
				}),
			});
		},
		300,
	);

	const reflectOtherDrawing = (ctx: CanvasRenderingContext2D) => {
		channel.on("broadcast", { event: "draw-path" }, ({ payload }) => {
			const {
				points,
				lineData,
			}: { points: MousePosition[]; lineData: LineData } = JSON.parse(payload);
			const path = new Path2D();

			const double: MousePosition[] = [];
			let beginPoint: MousePosition | undefined;
			for (const point of points) {
				double.push(point);
				beginPoint = traceLine(double, beginPoint, path);
			}

			ctx.lineWidth = lineData.width;
			ctx.strokeStyle = lineData.color;
			ctx.shadowBlur = 0.5;
			ctx.shadowColor = lineData.color;
			ctx.lineJoin = "round";
			ctx.lineCap = "round";
			ctx.stroke(path);
		});
	};

	return { publishDrawPath, reflectOtherDrawing };
};

export const traceLine = (
	points: MousePosition[],
	beginPoint: MousePosition | undefined,
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
