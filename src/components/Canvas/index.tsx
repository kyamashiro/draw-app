import React, { useRef, useState } from "react";
import * as d3 from "d3";

interface MousePosition {
  x: number;
  y: number;
}

export const Canvas: React.FC = () => {
  const height = 2900;
  const svgRef = useRef<SVGSVGElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const points: MousePosition[] = [];
  // @ts-ignore
  const [currentPath, setCurrentPath] = useState<Selection<
    SVGSVGElement | null,
    unknown,
    HTMLElement,
    any
  > | null>(null);
  const color = "rgba(0, 0, 0, 1)";

  const startDrawing = () => {
    setIsMouseDown(true);
  };

  const endDrawing = () => {
    setIsMouseDown(false);
  };

  const getMousePosition = (
    svg: SVGSVGElement,
    e: React.MouseEvent<SVGSVGElement>
  ) => {
    const rect = svg.getBoundingClientRect();

    return {
      x: ((e.clientX - rect.left) / (rect.right - rect.left)) * svg.clientWidth,
      y: ((e.clientY - rect.top) / (rect.bottom - rect.top)) * svg.clientHeight,
    };
  };

  const [transformedObj, setTransformedObj] = useState<any>([]);

  const drawing = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isMouseDown) return;
    if (!svgRef.current) return;
    const { x, y } = getMousePosition(svgRef.current, e);
    points.push({ x, y });

    if (!currentPath) {
      setCurrentPath(
        d3
          .select<SVGSVGElement, unknown>(svgRef.current)
          .append("path")
          .style("stroke-width", 10)
          .style("fill", "none")
          .attr("stroke", color)
          .style("stroke-linecap", "round")
      );
    }
    // currentPath.datum(points).attr("d", d3.line().curve(d3.curveBasis));

    let path = `M${points[0].x},${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const { x, y } = points[i];
      path += `L${x},${y}`;
    }

    setTransformedObj([...transformedObj, path]);
  };

  return (
    <div className="container">
      <svg
        ref={svgRef}
        width={1000}
        height={height}
        onMouseDown={() => startDrawing()}
        onMouseUp={() => endDrawing()}
        onMouseMove={(e) => drawing(e)}
      >
        {transformedObj.map((d: any, i: any) => {
          return (
            <path
              key={i}
              stroke={color}
              strokeWidth={10}
              fill="none"
              strokeLinecap="round"
              d={d}
            />
          );
        })}
      </svg>
    </div>
  );
};
