import React, { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { brushAtom } from "state/Tools";
import { useUndo } from "components/Canvas/useUndo";
import { Tools } from "components/Tools";
import { Flex } from "@chakra-ui/react";

interface MousePosition {
  x: number;
  y: number;
}

// eslint-disable-next-line react/display-name
export const Canvas: React.FC = () => {
  const [{ size, color }] = useAtom(brushAtom);
  const ctxRef = useRef<CanvasRenderingContext2D>(null!);
  const { undo, redo, snapshot, clear, isDisableUndo, isDisableRedo } =
    useUndo();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const points: MousePosition[] = [];
  let beginPoint: MousePosition | null = null;

  useEffect(() => {
    ctxRef.current.lineWidth = size / 10;
    ctxRef.current.strokeStyle = color;
    ctxRef.current.fillStyle = color;
    ctxRef.current.shadowBlur = 2;
    ctxRef.current.shadowColor = color;
  }, [color, size]);

  // 初回のみ実行
  useEffect(() => {
    console.log("init");
    snapshot(ctxRef.current);
  }, []);

  const startDrawing = () => {
    snapshot(ctxRef.current);
    setIsMouseDown(true);
  };

  const endDrawing = () => {
    setIsMouseDown(false);
  };

  const drawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isMouseDown) return;

    const { x, y } = getMousePosition(ctxRef.current.canvas, e);
    points.push({ x, y });
    if (points.length > 3) {
      const lastTwoPoints = points.slice(-2);
      const controlPoint = lastTwoPoints[0];
      const endPoint = {
        x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
        y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
      };

      if (beginPoint) {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(beginPoint.x, beginPoint.y);
        ctxRef.current.bezierCurveTo(
          beginPoint.x,
          beginPoint.y,
          controlPoint.x,
          controlPoint.y,
          endPoint.x,
          endPoint.y
        );
        ctxRef.current.stroke();
        ctxRef.current.closePath();
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

  return (
    <Flex alignItems={"center"}>
      <Tools
        ctx={ctxRef.current}
        handlers={{
          undo: () => undo(ctxRef.current),
          redo: () => redo(ctxRef.current),
          clear: () => clear(ctxRef.current),
          isDisableUndo,
          isDisableRedo,
        }}
      />
      <canvas
        ref={(canvasElement: HTMLCanvasElement) => {
          if (canvasElement) {
            ctxRef.current = canvasElement.getContext(
              "2d"
            ) as CanvasRenderingContext2D;
          }
        }}
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
    </Flex>
  );
};
