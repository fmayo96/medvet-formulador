import { useEffect, useState } from 'react'
import Page from './Page'
import Title from './Title'
import dogImg from '../assets/dog_default.png'
import catImg from '../assets/cat_default.jpg'
interface Props {
  petId: number | undefined
}

const rePerro = /Perr/

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
          {pet.imgPath ? (
            <img src={`FILE://${pet.imgPath}`} alt={`imagen de ${pet.name}`} />
          ) : rePerro.test(pet.species) ? (
            <img src={dogImg} alt="default dog image" />
          ) : (
            <img src={catImg} alt="default cat image" />
          )}
        </div>
      )}
      <p>
        Weight: {pet?.weight}, Metabolic Weight: {pet?.metabolicWeight}
      </p>
    </Page>
  )
}

export default PetProfile
