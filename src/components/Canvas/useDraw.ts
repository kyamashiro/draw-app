import { supabase } from "@client/supabase.ts";
import type { LineData, MousePosition } from "@components/Canvas/DrawLayer";

export const useDraw = () => {
	const channel = supabase.channel("draw-path");
	channel.subscribe((status) => {
		console.log("status", status);
	});

	const publishDrawPath = async (
		points: MousePosition[],
		lineData: LineData,
	) => {
		await channel.send({
			type: "broadcast",
			event: "draw-path",
			payload: JSON.stringify({
				points,
				lineData,
			}),
		});
	};

	const reflectOtherDrawing = (ctx: CanvasRenderingContext2D) => {
		channel.on("broadcast", { event: "draw-path" }, ({ payload }) => {
			const {
				points,
				lineData,
			}: { points: MousePosition[]; lineData: LineData } = JSON.parse(payload);
			console.log(lineData);
			const path = new Path2D();
			let beginPoint: MousePosition | undefined;
			const double: MousePosition[] = [];
			for (const point of points) {
				double.push(point);
				beginPoint = traceLine(double, beginPoint, path);
			}

			ctx.lineWidth = lineData.width;
			ctx.strokeStyle = lineData.color;
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
