import { useContext } from 'react'
import { PageContext, Routes } from '../store'
const reCachorro = /Cachorro/

interface CardProps {
  pet: PetDTO
}

const SmallCard = ({ pet }: CardProps) => {
  const { changeRoute, changePetId } = useContext(PageContext)

  function handleClick() {
    if (changePetId) changePetId(pet.id)
    if (changeRoute) changeRoute(Routes.PET_PROFILE)
  }

  return (
    <div
      key={pet.id}
      className="flex gap-8 w-90  rounded-sm p-4 shadow-slate-300 hover:shadow-slate-500 shadow-sm hover:cursor-pointer mx-4"
      onClick={handleClick}
    >
      <div className="grid grid-cols-2 w-full">
        <p className="text-lg font-semibold">{pet.name}</p>
        <p className="text-end ">Proteínas: {pet.protein}%</p>
        <p className="text-md">
          Edad: {pet.age} {reCachorro.test(pet.species) ? 'meses' : 'años'}
        </p>
        <p className="text-end">Grasas: {pet.fat}%</p>
        <p className="text-md">Peso: {pet.weight} kg</p>

        <p className="text-end">Carbohidratos: {pet.carbs}%</p>
        <p></p>
        <p className="text-end">Fibra (%DM): {pet.fiber}</p>
      </div>
    </div>
  )
}
export default SmallCard
