import React, { MutableRefObject, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { brushAtom, zoomAtom } from "state/Tools";
import { Color } from "../Tools/ColorPicker";

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
  snapshot: (lineData: LineData) => void;
}

const LEFT_BUTTON = 0;
const RIGHT_BUTTON = 2;
const CANVAS_WIDTH = 3000;
const CANVAS_HEIGHT = 3000;

export const drawLine = (
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
      ctx.moveTo(beginPoint.x, beginPoint.y);
      ctx.bezierCurveTo(
        beginPoint.x,
        beginPoint.y,
        controlPoint.x,
        controlPoint.y,
        endPoint.x,
        endPoint.y,
      );
      path.moveTo(beginPoint.x, beginPoint.y);
      path.bezierCurveTo(
        beginPoint.x,
        beginPoint.y,
        controlPoint.x,
        controlPoint.y,
        endPoint.x,
        endPoint.y,
      );
      ctx.stroke();
    }
    return endPoint;
  }
};

// eslint-disable-next-line react/display-name
export const Canvas: React.FC<Props> = ({ ctxRef, snapshot }) => {
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

  const handleMouseUp = () => {
    if (isMouseLeftDown) {
      snapshot(line);
    }
    setIsMouseLeftDown(false);
    setIsMouseRightDown(false);
    setCursor("crosshair");
    points = [];
  };

  let previousClientX: number, previousClientY: number;

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isMouseLeftDown) {
      const { x, y } = getMousePosition(ctxRef.current.canvas, e);
      points.push({ x, y });
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
    <div>
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
        }}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={() => handleMouseUp()}
        onMouseMove={(e) => handleMouseMove(e)}
        onContextMenu={(e) => handleRightClick(e)}
      />
    </div>
  );
};
