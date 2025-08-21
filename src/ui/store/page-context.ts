import { createContext } from "react";

export enum SelectedButton {
  "CREATE_PROFILE" = 1,
  "SAVED_PROFILES" = 2,
  "CREATE_RECIPE" = 3,
}

interface PageCtx {
  buttonId: SelectedButton;
  changeButtonId?: (buttonId: SelectedButton) => void;
}

export const PageContext = createContext<PageCtx>({
  buttonId: SelectedButton.CREATE_PROFILE,
});
