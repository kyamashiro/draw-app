import { useState } from "react";
import { LineData } from "./index";

export interface UseUndo {
  undo: () => void;
  redo: () => void;
  snapshot: (line: LineData) => void;
  clear: () => void;
  isDisableUndo: boolean;
  isDisableRedo: boolean;
}

type Props = (ctx: CanvasRenderingContext2D) => UseUndo;

export const useUndo: Props = (ctx) => {
  const [undoDataStack, setUndoDataStack] = useState<LineData[]>([]);
  const [redoDataStack, setRedoDataStack] = useState<LineData[]>([]);

  const undo = (): void => {
    console.log("undo");
    if (undoDataStack.length <= 0) return;

    const lastPath = undoDataStack.slice(-1)[0];
    setRedoDataStack((prevState) => [...prevState, lastPath]);
    const newUndoDataStack = undoDataStack.slice(0, -1);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    newUndoDataStack.forEach(({ shape, width, color }) => {
      ctx.lineWidth = width;
      ctx.strokeStyle = color;
      ctx.stroke(shape);
    });
    setUndoDataStack(newUndoDataStack);
  };

  const redo = () => {
    console.log("redo");
    if (redoDataStack.length <= 0) return;

    const lastUndoOperation = redoDataStack.slice(-1)[0];
    ctx.lineWidth = lastUndoOperation.width;
    ctx.strokeStyle = lastUndoOperation.color;
    ctx.stroke(lastUndoOperation.shape);
    const newRedoDataStack = redoDataStack.slice(0, -1);
    setRedoDataStack(newRedoDataStack);
    setUndoDataStack((prevState) => [...prevState, lastUndoOperation]);
  };

  const clear = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const snapshot = (line: LineData): void => {
    console.log("snapshot");
    setUndoDataStack((prevState) => [...prevState, line]);
  };

  return {
    undo,
    redo,
    snapshot,
    clear,
    isDisableUndo: undoDataStack.length === 0,
    isDisableRedo: redoDataStack.length === 0,
  };
};
