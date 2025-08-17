import "./App.css";
import CreateProfile from "./components/CreateProfile";
import NavBar from "./components/NavBar";
import { useState } from "react";
import SavedProfiles from "./components/SavedProfiles";
import CreateRecipe from "./components/CreateRecipe";

function App() {
  type SelectedButton = 1 | 2 | 3;
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

  return (
    <main className="flex h-screen w-screen gap-4">
      <NavBar selectedButton={selectedButton} onSelect={handleSelectButton} />
      {content}
    </main>
  );
}
export default App;
