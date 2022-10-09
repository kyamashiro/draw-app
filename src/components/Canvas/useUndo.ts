import { useState } from "react";

export interface UseUndo {
  undo: () => void;
  redo: () => void;
  snapshot: (ctx: CanvasRenderingContext2D) => void;
  clear: () => void;
  isDisableUndo: boolean;
  isDisableRedo: boolean;
}

type Props = (ctx: CanvasRenderingContext2D) => UseUndo;

export const useUndo: Props = (ctx) => {
  const [undoDataStack, setUndoDataStack] = useState<ImageData[]>([]);
  const [redoDataStack, setRedoDataStack] = useState<ImageData[]>([]);

  const undo = (): void => {
    console.log("undo");
    if (undoDataStack.length <= 0) return;
    // 現在の状態をRedoスタックに保存
    setRedoDataStack([
      ...redoDataStack,
      ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height),
    ]);
    const imageData = undoDataStack[undoDataStack.length - 1];
    if (imageData) {
      ctx.putImageData(imageData, 0, 0);
    }
    // Undoスタックから削除
    const tmp = undoDataStack;
    tmp.pop();
    setUndoDataStack(tmp);
  };

  const redo = () => {
    console.log("redo");
    if (redoDataStack.length <= 0) return;
    const imageData = redoDataStack[redoDataStack.length - 1];
    // 現在の状態をUndoスタックに保存
    setUndoDataStack([
      ...undoDataStack,
      ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height),
    ]);

    if (imageData) {
      ctx.putImageData(imageData, 0, 0);
    }
    const tmp = redoDataStack;
    tmp.pop();
    setRedoDataStack(tmp);
  };

  const clear = () => {
    snapshot(ctx);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const snapshot = (ctx: CanvasRenderingContext2D): void => {
    console.log("snapshot");
    setUndoDataStack([
      ...undoDataStack,
      ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height),
    ]);
  };

  return {
    undo,
    redo,
    snapshot,
    clear,
    isDisableUndo: undoDataStack.length === 1,
    isDisableRedo: redoDataStack.length === 0,
  };
};
