import { atom } from "jotai";
import { Color, INITIAL_COLOR } from "components/Tools/ColorPicker";

export interface Brush {
  size: number;
  color: Color;
}
export const brushAtom = atom({
  size: 50,
  color: INITIAL_COLOR,
});

export const zoomAtom = atom(1.0);
