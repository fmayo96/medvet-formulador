import { useContext } from 'react'
import { PageContext, Routes } from '../store'
const reCachorro = /Cachorro/
interface CardProps {
  pet: PetInfo
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
      className="flex gap-8 w-64  rounded-sm p-4 shadow-slate-300 hover:shadow-slate-500 shadow-sm hover:cursor-pointer mx-4"
      onClick={handleClick}
    >
      <div className="flex flex-col w-full">
        <div className='flex justify-between'>
          <p className="text-xl font-semibold">{pet.name}</p>
          <p className="text-lg">{pet.species}</p>
        </div>
        <p className="text-lg">
          Edad: {pet.age} {reCachorro.test(pet.species) ? 'meses' : 'años'}
        </p>
        <p className="text-lg">Peso: {pet.weight} kg</p>
      </div>
    </div>
  )
}
export default SmallCard
