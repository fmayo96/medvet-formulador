import './App.css'
import CreateProfile from './components/CreateProfile'
import NavBar from './components/NavBar'
import { useState } from 'react'
import SavedProfiles from './components/SavedProfiles'
import CreateRecipe from './components/CreateRecipe'
import { PageContext, Routes } from './store/page-context'
import PetProfile from './components/PetProfile'

const App = () => {
  const [route, setRoute] = useState<Routes>(Routes.CREATE_PROFILE)
  const [petId, setPetId] = useState<number | undefined>(undefined)

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
    default:
      break
  }

  const ctxValue = {
    route: route,
    changeRoute: (route: Routes) => setRoute(route),
    petId: petId,
    changePetId: (id: number | undefined) => setPetId(id),
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
