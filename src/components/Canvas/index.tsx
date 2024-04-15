import React, { useRef, useState } from "react";
import * as d3 from "d3";

export type Points = [number, number][];

export const Canvas: React.FC = () => {
  const height = 2900;
  const svgRef = useRef<SVGSVGElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [points, setPoints] = useState<Points>([]);

  // @ts-ignore
  const [currentPath, setCurrentPath] = useState<Selection<
    SVGSVGElement | null,
    unknown,
    HTMLElement,
    any
  > | null>(null);
  const color = "rgba(0, 0, 0, 1)";

  const startDrawing = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsMouseDown(true);
    if (!svgRef.current) return;
    const [x, y] = d3.pointer(e);
    setPoints((prev) => [...prev, [x, y]]);
    setCurrentPath(
      d3
        .select<SVGSVGElement, unknown>(svgRef.current)
        .append("path")
        .style("stroke-width", 10)
        .style("fill", "none")
        .attr("stroke", color)
        .style("stroke-linecap", "round")
    );
  };

  const endDrawing = () => {
    setIsMouseDown(false);
    setCurrentPath(null);
    setPoints([]);
  };

  const drawing = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isMouseDown) return;
    if (!svgRef.current) return;
    const [x, y] = d3.pointer(e);
    setPoints((prev) => [...prev, [x, y]]);
    currentPath.datum(points).attr("d", d3.line().curve(d3.curveBasis));
  };

  return (
    <div className="container">
      <svg
        ref={svgRef}
        width={1000}
        height={height}
        onMouseDown={(e) => startDrawing(e)}
        onMouseUp={() => endDrawing()}
        onMouseMove={(e) => drawing(e)}
      />
    </div>
  );
};
