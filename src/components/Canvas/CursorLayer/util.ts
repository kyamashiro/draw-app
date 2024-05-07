export const drawCursor = (
	ctx: CanvasRenderingContext2D,
	startX: number,
	startY: number,
	endX: number,
	endY: number,
	controlPoints: number[],
) => {
	const dx = endX - startX;
	const dy = endY - startY;
	const len = Math.sqrt(dx * dx + dy * dy);
	const sin = dy / len;
	const cos = dx / len;
	const a = [];
	a.push(0, 0);
	for (let i = 0; i < controlPoints.length; i += 2) {
		const x = controlPoints[i];
		const y = controlPoints[i + 1];
		a.push(x < 0 ? len + x : x, y);
	}
	a.push(len, 0);
	for (let i = controlPoints.length; i > 0; i -= 2) {
		const x = controlPoints[i - 2];
		const y = controlPoints[i - 1];
		a.push(x < 0 ? len + x : x, -y);
	}
	a.push(0, 0);
	for (let i = 0; i < a.length; i += 2) {
		const x = a[i] * cos - a[i + 1] * sin + startX;
		const y = a[i] * sin + a[i + 1] * cos + startY;
		if (i === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	}
};
