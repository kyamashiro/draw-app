import React, { useRef, useState } from "react";

const App = () => {
  const canvasRef = useRef(null!);

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    return canvas.getContext("2d");
  };

  const [isMouseDown, setIsMouseDown] = useState(false);

  const startDrawing = (x: number, y: number) => {
    setIsMouseDown(true);
    const ctx = getContext();
    ctx.moveTo(x, y);
  };

  const draw = (x: number, y: number) => {
    if (!isMouseDown) {
      return;
    }
    const ctx = getContext();
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDrawing = () => {
    setIsMouseDown(false);
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
    <div>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", border: "1px solid black" }}
        onMouseDown={(e) => {
          const { x, y } = getMousePosition(canvasRef.current, e);
          startDrawing(x, y);
        }}
        onMouseUp={() => endDrawing()}
        onMouseMove={(e) => {
          const { x, y } = getMousePosition(canvasRef.current, e);
          draw(x, y);
        }}
      />
    </div>
  );
};

export default App;
