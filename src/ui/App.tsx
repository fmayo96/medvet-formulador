import "./App.css";
import CreateProfile from "./components/CreateProfile";
import NavBar from "./components/NavBar";
import { useState } from "react";
import SavedProfiles from "./components/SavedProfiles";
import CreateRecipe from "./components/CreateRecipe";
import { PageContext, SelectedButton } from "./store/page-context";

function App() {
  const [selectedButton, setSelectedButton] = useState<SelectedButton>(
    SelectedButton.CREATE_PROFILE,
  );

  function handleSelectButton(buttonId: SelectedButton) {
    setSelectedButton(buttonId);
  }

  let content = <CreateProfile />;
  if (selectedButton === SelectedButton.SAVED_PROFILES) {
    content = <SavedProfiles />;
  } else if (selectedButton === SelectedButton.CREATE_RECIPE) {
    content = <CreateRecipe />;
  }

  const ctxValue = {
    buttonId: selectedButton,
    changeButtonId: handleSelectButton,
  };

  return (
    <PageContext value={ctxValue}>
      <main className="flex h-screen w-screen gap-4">
        <NavBar />
        {content}
      </main>
    </PageContext>
  );
}
export default App;
