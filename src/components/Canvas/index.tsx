import React, { useRef, useState } from "react";
import { useAtom } from "jotai";
import { brushAtom } from "state/Tools";

interface MousePosition {
  x: number;
  y: number;
}

export const Canvas: React.FC = () => {
  const canvasRef = useRef(null!);
  const [{ size, color }] = useAtom(brushAtom);
  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = size / 10;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.shadowBlur = 2;
    ctx.shadowColor = color;
    return ctx;
  };

  const [isMouseDown, setIsMouseDown] = useState(false);
  const points: MousePosition[] = [];
  let beginPoint: MousePosition | null = null;

  const startDrawing = () => {
    setIsMouseDown(true);
  };

  const endDrawing = () => {
    setIsMouseDown(false);
  };

  const drawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isMouseDown) return;

    const { x, y } = getMousePosition(canvasRef.current, e);
    points.push({ x, y });
    if (points.length > 3) {
      const lastTwoPoints = points.slice(-2);
      const controlPoint = lastTwoPoints[0];
      const endPoint = {
        x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
        y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
      };

      if (beginPoint) {
        const ctx = getContext();
        ctx.beginPath();
        ctx.moveTo(beginPoint.x, beginPoint.y);
        ctx.bezierCurveTo(
          beginPoint.x,
          beginPoint.y,
          controlPoint.x,
          controlPoint.y,
          endPoint.x,
          endPoint.y
        );
        ctx.stroke();
        ctx.closePath();
      }
      beginPoint = endPoint;
    }
  };

  const getMousePosition = (
    canvas: HTMLCanvasElement,
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const rect = canvas.getBoundingClientRect();

    return {
      x: ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
      y: ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
    };
  };

  document.addEventListener("clearCanvas", () => {
    clearCanvas();
  });

  const clearCanvas = () => {
    const canvas: any = canvasRef.current;
    const ctx = getContext();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <canvas
      ref={canvasRef}
      width={`${window.screen.width}px`}
      height={`${window.screen.height}px`}
      style={{
        border: "1px solid black",
        cursor: "crosshair",
      }}
      onMouseDown={() => startDrawing()}
      onMouseUp={() => endDrawing()}
      onMouseMove={(e) => drawing(e)}
    />
  );
};
