import './App.css'
import CreateProfile from './components/CreateProfile'
import NavBar from './components/NavBar'
import { useState } from 'react'
import SavedProfiles from './components/SavedProfiles'
import CreateRecipe from './components/CreateRecipe'
import { PageContext, Routes } from './store/page-context'
import PetProfile from './components/PetProfile'
import EditRecipe from './components/EditRecipe'

const App = () => {
  const [route, setRoute] = useState<Routes>(Routes.CREATE_PROFILE)
  const [petId, setPetId] = useState<number | undefined>(undefined)
  const [recipeId, setRecipeId] = useState<number | undefined>(undefined)
  const [createNew, setCreateNew] = useState(false)

  let content = <CreateProfile />

  switch (route) {
    case Routes.SAVED_PROFILES:
      content = <SavedProfiles />
      break
    case Routes.CREATE_RECIPE:
      content = <CreateRecipe />
      break
    case Routes.PET_PROFILE:
      content = <PetProfile petId={petId} />
      break
    case Routes.EDIT_REIPE:
      if (petId && recipeId)
        content = (
          <EditRecipe petId={petId} recipeId={recipeId} createNew={createNew} />
        )
      break
    default:
      break
  }

  const ctxValue = {
    route: route,
    changeRoute: (route: Routes) => setRoute(route),
    petId: petId,
    createNew: createNew,
    changePetId: (id: number | undefined) => setPetId(id),
    changeRecipeId: (id: number | undefined) => setRecipeId(id),
    changeCreateNew: (value: boolean) => setCreateNew(value),
  }

  return (
    <PageContext value={ctxValue}>
      <main className="flex h-screen w-screen gap-4">
        <NavBar />
        {content}
      </main>
    </PageContext>
  )
}
export default App
