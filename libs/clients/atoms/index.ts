import { atom } from "recoil";

export const isMenuOpenedAtom = atom({
  key: "isMenuOpened",
  default: false,
});

type CurrentInputModeType = "" | "VIDEO" | "CATEGORY";
export const currentInputModeAtom = atom<CurrentInputModeType>({
  key: "currentInputMode",
  default: "",
});
