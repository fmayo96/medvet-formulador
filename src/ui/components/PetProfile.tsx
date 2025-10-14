import { useEffect, useState, useContext } from 'react'
import { PageContext, Routes } from '../store'
import Page from './Page'
import Title from './Title'
import dogImg from '../assets/dog_default.png'
import catImg from '../assets/cat_default.jpg'
import trashImg from '../assets/delete-2-svgrepo-com.svg'
import editImg from '../assets/edit-3-svgrepo-com.svg'
import addImg from '../assets/add-plus-svgrepo-com.svg'
interface Props {
  petId: number | undefined
}

const rePerro = /Perr/
const reCachorro = /Cachorro/

const PetProfile = ({ petId }: Props) => {
  const [pet, setPet] = useState<PetDTO | null>()
  const [recipes, setRecipes] = useState<RecipeDTO[]>()

  const { changeRoute, changePetId, changeRecipeId, changeCreateNew } =
    useContext(PageContext)

  async function getPetById(id: number | undefined) {
    if (id === undefined) return
    const fetchedPet = await window.electron.getPetById(id)
    if (fetchedPet.length === 0) {
      setPet(null)
    }
    setPet(fetchedPet[0])
    const fetchedRecipes = await window.electron.getRecipesByPetName(
      fetchedPet[0].name
    )
    setRecipes(fetchedRecipes)
  }

  async function handleEditRecipe(id: number) {
    if (changeRecipeId) changeRecipeId(id)
    if (changePetId) changePetId(petId!)
    if (changeCreateNew) changeCreateNew(false)
    if (changeRoute) changeRoute(Routes.EDIT_REIPE)
  }

  async function handleAddFood(id: number) {
    if (changeRecipeId) changeRecipeId(id)
    if (changePetId) changePetId(petId!)
    if (changeCreateNew) changeCreateNew(true)
    if (changeRoute) changeRoute(Routes.EDIT_REIPE)
  }

  async function handleDeleteRecipe(id: number) {
    await window.electron.deleteRecipeById(id)
    setRecipes((prev) => prev?.filter((r) => r.id !== id))
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
                <button className="bg-[#6B9DA6] hover:bg-[#6B9DA6]/80  px-2 rounded-md text-white hover:cursor-pointer h-10">
                  Editar
                </button>
                <button className="bg-[#75578F] hover:bg-[#75578F]/80 px-2 text-md hover:cursor-pointer text-white rounded-md  h-10">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row  gap-32 w-5/6 h-60 mx-10 px-8 py-4 mt-8 shadow-md rounded-md ">
            <div className="flex flex-col gap-2 w-full">
              <h1 className="text-2xl font-semibold">Recetas</h1>
              <div className="grid grid-cols-3 gap-2 w-full">
                {recipes &&
                  recipes.map((r) => (
                    <div className="flex gap-2 items-center" key={r.id}>
                      <p>{`Fecha: ${r.date}`}</p>
                      <button
                        className="bg-[#A7D7DD] hover:bg-[#A7D7DD]/80 h-7 w-7  px-1 text-sm rounded-sm text-white hover:cursor-pointer"
                        onClick={() => handleAddFood(r.id)}
                      >
                        <img src={addImg} className="w-5 h-5" />
                      </button>
                      <button
                        className="bg-[#6B9DA6] hover:bg-[#6B9DA6]/80 h-7 w-7  px-1 text-sm rounded-sm text-white hover:cursor-pointer"
                        onClick={() => handleEditRecipe(r.id)}
                      >
                        <img src={editImg} className="w-5 h-5" />
                      </button>
                      <button
                        className="bg-[#75578F]  hover:bg-[#75578F]/80 text-sm px-1 h-7 w-7 hover:cursor-pointer text-white rounded-sm"
                        onClick={() => handleDeleteRecipe(r.id)}
                      >
                        <img src={trashImg} className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
              </div>
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
