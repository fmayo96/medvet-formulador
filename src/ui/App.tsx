import "./App.css";
import CreateProfile from "./components/CreateProfile";
import NavBar from "./components/NavBar";
import { useState } from "react";
import SavedProfiles from "./components/SavedProfiles";
import CreateRecipe from "./components/CreateRecipe";
import { PageContext } from "./store/page-context";

function App() {
  const [selectedButton, setSelectedButton] = useState<SelectedButton>(1);

  function handleSelectButton(buttonId: SelectedButton) {
    setSelectedButton(buttonId);
  }

  let content = <CreateProfile />;
  if (selectedButton === 2) {
    content = <SavedProfiles />;
  } else if (selectedButton === 3) {
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
