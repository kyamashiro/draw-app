import { INITIAL_COLOR } from "@components/Tools/ColorPicker";
import { atom } from "jotai";

export const BRUSH_WIDTHS = {
	SMALL: 5,
	MEDIUM: 10,
	LARGE: 15,
};

export const brushAtom = atom({
	width: BRUSH_WIDTHS.MEDIUM,
	color: INITIAL_COLOR,
});

export const zoomAtom = atom(1.0);
