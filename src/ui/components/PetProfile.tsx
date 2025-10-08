import { useEffect, useState } from 'react'
import Page from './Page'
import Title from './Title'
import dogImg from '../assets/dog_default.png'
import catImg from '../assets/cat_default.jpg'
import Recipe from './Recipe'
interface Props {
  petId: number | undefined
}

const rePerro = /Perr/
const reCachorro = /Cachorro/

const PetProfile = ({ petId }: Props) => {
  const [pet, setPet] = useState<PetDTO | null>()
  const [recipes, setRecipes] = useState<RecipeDTO[]>()
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDTO | null>(null)

  async function getPetById(id: number | undefined) {
    if (id === undefined) return
    const fetchedPet = await window.electron.getPetById(id)
    if (fetchedPet.length === 0) {
      setPet(null)
    }
    setPet(fetchedPet[0])
    const fetchedRecipes = await getRecipes(fetchedPet[0].name)
    setRecipes(fetchedRecipes)
    console.log(fetchedRecipes)
  }

  async function getRecipes(name: string) {
    const recipes = await window.electron.getRecipesByPetName(name)
    return recipes
  }

  function handleSelectRecipe(id: number) {
    const selection = recipes?.find((r) => r.id === id)
    if (!selection) return
    setSelectedRecipe(selection)
  }

  function handleClose() {
    setSelectedRecipe(null)
  }

  useEffect(() => {
    getPetById(petId)
  }, [petId])

  return (
    <Page>
      <Title content="Perfil del animal" />
      {!pet ? (
        <p>Error: pet ID not found</p>
      ) : (
        <>
          <div className="flex flex-row text-lg gap-32 w-5/6 h-60 mx-10 px-8 py-4 mt-8 shadow-md rounded-md ">
            <div className="w-32 h-32 self-center overflow-hidden rounded-full">
              {pet.imgPath ? (
                <img
                  src={`file://${pet.imgPath}`}
                  alt="pet image"
                  className="w-full h-full object-cover"
                />
              ) : rePerro.test(pet.species) ? (
                <img
                  src={dogImg}
                  alt="default dog image"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={catImg}
                  alt="default cat image"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-semibold">{pet.name}</h1>
              <p>
                Edad: {pet.age}{' '}
                {reCachorro.test(pet.species) ? 'meses' : 'años'}
              </p>
              <p>Peso {pet.weight} kg</p>
              <p>Nivel de actividad: </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-2xl">{pet.species}</p>
              <p>Condición corporal: 5</p>
              <p>
                Peso ideal: {pet.idealWeight > 0 ? pet.idealWeight : pet.weight}{' '}
                kg
              </p>
              <div className="flex gap-2">
                <button className="bg-[#6B9DA6] hover:bg-[#6B9DA6]/80  p-2 rounded-md text-white hover:cursor-pointer">
                  Editar
                </button>
                <button className="bg-[#75578F] hover:bg-[#75578F]/80 text-md hover:cursor-pointer text-white rounded-md p-2">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row  gap-32 w-5/6 h-60 mx-10 px-8 py-4 mt-8 shadow-md rounded-md ">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-semibold">Recetas</h1>
              <ul>
                {recipes &&
                  recipes.map((r) => (
                    <li
                      key={r.id}
                      onClick={() => handleSelectRecipe(r.id)}
                      className="hover:cursor-pointer"
                    >
                      {r.date}
                    </li>
                  ))}
              </ul>
              {selectedRecipe && (
                <Recipe recipe={selectedRecipe} handleClose={handleClose} />
              )}
            </div>
          </div>
          <div className="flex flex-row  gap-32 w-5/6 h-60 mx-10 px-8 py-4 mt-8 shadow-md rounded-md ">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-semibold">Consultas</h1>
              <p>
                Acá van a ir las fechas de las consultas con links a las notas
                (como pasa con las recetas)
              </p>
            </div>
          </div>
        </>
      )}
    </Page>
  )
}

export default PetProfile
