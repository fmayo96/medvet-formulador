import { useContext } from 'react'
import { PageContext, Routes } from '../store'
import dogImg from '../assets/dog_default.png'
import catImg from '../assets/cat_default.jpg'
const reCachorro = /Cachorro/
const rePerro = /Perr/
interface CardProps {
  pet: PetDTO
}

const Card = ({ pet }: CardProps) => {
  const { changeRoute, changePetId } = useContext(PageContext)

  function handleClick() {
    if (changePetId) changePetId(pet.id)
    if (changeRoute) changeRoute(Routes.PET_PROFILE)
  }

  return (
    <div
      key={pet.id}
      className="flex gap-8  rounded-sm p-4 shadow-slate-300 hover:shadow-slate-500 shadow-sm hover:cursor-pointer mx-4 px-8"
      onClick={handleClick}
    >
      <div className="w-25 h-25 overflow-hidden rounded-full">
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
      <div className="flex flex-col">
        <p className="text-xl font-semibold">{pet.name}</p>
        <p className="text-lg">
          Edad: {pet.age} {reCachorro.test(pet.species) ? 'meses' : 'años'}
        </p>
        <p className="text-lg">Peso: {pet.weight} kg</p>
        <p className="text-lg">{pet.species}</p>
      </div>
    </div>
  )
}
export default Card
