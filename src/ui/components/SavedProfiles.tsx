import { useEffect, useState, useContext, type ChangeEvent } from 'react'
import Title from './Title'
import Page from './Page'
import CardsGrid from './CardsGrid'
import Search from './Search'
import Button from './Button'
import { PageContext, Routes } from '../store/page-context'

const SavedProfiles = () => {
  const [pets, setPets] = useState<PetDTO[]>()
  const [search, setSearch] = useState('')
  const filteredPets = pets?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )
  const { changeRoute } = useContext(PageContext)

  async function getPets() {
    const allPets = await window.electron.getAllPets()
    setPets(allPets)
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const newSearch = event.target.value
    setSearch(newSearch)
  }

  function handleCreateProfile() {
    changeRoute!(Routes.CREATE_PROFILE)
  }

  useEffect(() => {
    getPets()
  }, [])

  return (
    <Page>
      <Title content="Perfiles guardados" />
      <div className="flex align-middle gap-4 my-8">
        <Search
          value={search}
          placeholder="Buscar animal"
          onChange={handleSearch}
        />
        <Button type="dark" onClick={handleCreateProfile}>
          Crear perfil
        </Button>
      </div>
      <CardsGrid pets={filteredPets} />
    </Page>
  )
}
export default SavedProfiles
