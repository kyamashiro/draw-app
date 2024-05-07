import { INITIAL_COLOR } from "@components/Tools/ColorPicker";
import { atom } from "jotai";

export const brushAtom = atom({
	width: 6,
	color: INITIAL_COLOR,
});

export const zoomAtom = atom(1.0);
