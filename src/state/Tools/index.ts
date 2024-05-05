import { atom } from "jotai";
import { Color, INITIAL_COLOR } from "@components/Tools/ColorPicker";

export interface Brush {
  width: number;
  color: Color;
}
export const brushAtom = atom({
  width: 6,
  color: INITIAL_COLOR,
});

export const zoomAtom = atom(1.0);
