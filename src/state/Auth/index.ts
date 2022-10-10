import { atom } from "jotai";
import type { UserInfo } from "firebase/auth";

export const authAtom = atom<UserInfo | null>(null);
