import { useEffect, useState } from "react"
import Page from "./Page"
import Title from "./Title"

interface Props {
  petId: number | undefined
}

const PetProfile = ({ petId }: Props) => {
  const [pet, setPet] = useState<PetDTO | null>()

  async function getPetById(id: number | undefined) {
    if (id === undefined) return
    const fetchedPet = await window.electron.getPetById(id)
    if (fetchedPet.length === 0) {
      setPet(null)
    }
    setPet(fetchedPet[0])
  }

  useEffect(() => {
    getPetById(petId)
  }, [petId])

  return (
    <Page>
      <Title content="Perfil del Animal" />
      {!pet ? (
        <p>Error: pet ID not found</p>
      ) : (
        <div>
          <img src={`FILE://${pet.imgPath}`} alt={`imagen de ${pet.name}`} />
        </div>
      )}
    </Page>
  )
}

export default PetProfile
