import { randomColor } from "@chakra-ui/theme-tools";
import type { MousePosition } from "@components/Canvas/DrawLayer";
import { atom } from "jotai";

export interface User {
	id: string;
	name: string;
	color: string;
}

export const meAtom = atom<User>({
	id: crypto.randomUUID(),
	name: "Your Name",
	color: randomColor(),
});
export const usersAtom = atom<Map<string, User>>(new Map());
export const cursorsAtom = atom<Map<string, MousePosition>>(new Map());
