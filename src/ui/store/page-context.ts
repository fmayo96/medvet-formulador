import { createContext } from "react";

interface PageCtx {
  buttonId: SelectedButton;
  changeButtonId?: (buttonId: SelectedButton) => void;
}

export const PageContext = createContext<PageCtx>({
  buttonId: 1,
});
