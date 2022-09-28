import { atom } from "jotai";

export interface Brush {
  size: number;
}
export const brushAtom = atom({
  size: 50,
});
