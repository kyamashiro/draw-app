import { useState } from "react";

export interface UseUndo {
  undo: () => void;
  redo: () => void;
  snapshot: (path: Path2D) => void;
  clear: () => void;
  isDisableUndo: boolean;
  isDisableRedo: boolean;
}

type Props = (ctx: CanvasRenderingContext2D) => UseUndo;

export const useUndo: Props = (ctx) => {
  const [undoDataStack, setUndoDataStack] = useState<Path2D[]>([]);
  const [redoDataStack, setRedoDataStack] = useState<Path2D[]>([]);

  const undo = (): void => {
    console.log("undo");
    if (undoDataStack.length <= 0) return;

    const lastPath = undoDataStack.slice(-1)[0];
    setRedoDataStack((prevState) => [...prevState, lastPath]);
    const newUndoDataStack = undoDataStack.slice(0, -1);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    newUndoDataStack.forEach((path) => {
      ctx.stroke(path);
    });
    setUndoDataStack(newUndoDataStack);
  };

  const redo = () => {
    console.log("redo");
    if (redoDataStack.length <= 0) return;

    const lastUndoOperation = redoDataStack.slice(-1)[0];
    ctx.stroke(lastUndoOperation);
    const newRedoDataStack = redoDataStack.slice(0, -1);
    setRedoDataStack(newRedoDataStack);
    setUndoDataStack((prevState) => [...prevState, lastUndoOperation]);
  };

  const clear = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const snapshot = (path: Path2D): void => {
    console.log("snapshot");
    setUndoDataStack((prevState) => [...prevState, path]);
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
