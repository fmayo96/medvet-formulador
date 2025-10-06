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
  const [recipes, setRecipes] = useState<RecipeDTO[]>()

  async function getPetById(id: number | undefined) {
    if (id === undefined) return
    const fetchedPet = await window.electron.getPetById(id)
    if (fetchedPet.length === 0) {
      setPet(null)
    }
    setPet(fetchedPet[0])
    const fetchedRecipes = await getRecipes(fetchedPet[0].name)
    setRecipes(fetchedRecipes)
  }

  async function getRecipes(name: string) {
    console.log(name)
    const recipes = await window.electron.getAllRecipes()
    console.log(recipes)
    return recipes
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
      {
        recipes && recipes[0].ingredients.map(i => <p>{i.name} {i.amount} {i.unidad}</p>)
      }
    </Page>
  )
}

export default PetProfile
