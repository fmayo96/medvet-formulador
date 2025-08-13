import React, { useState } from 'react'

type FormData = {
  name: string
  age: number
  weight: number
  species:
    | 'Perro Adulto'
    | 'Gato Adulto'
    | 'Perro Cachorro'
    | 'Gato Cachorro'
    | 'Perra Preñada'
    | 'Gata Preñada'
    | 'Perra Lactancia'
    | 'Gata Lactancia'
  numCachorros: number
  lactancyWeek: 1 | 2 | 3 | 4
  hasBlackFurr: boolean
  isCatOverweight: boolean
  estimatedEnergyFactor: number // This is calculated
  isIdealWeight: boolean
  idealWeight: number
  useRecommendedCaloricIntake: boolean // true for calculated value
  recommendedCaloricIntake: number // use this if useRecommendedCaloricIntake === false
  protein: number // percentage
  fat: number // percentage
  carbohydrate: number // percentage
  preferredFiber: number //percentage
  otherNotes: string
}

export default function CreateProfile() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: 0,
    weight: 0,
    species: 'Perro Adulto',
    numCachorros: 0,
    lactancyWeek: 1,
    hasBlackFurr: false,
    isCatOverweight: false,
    estimatedEnergyFactor: 0, // This is calculated
    isIdealWeight: false,
    idealWeight: 0,
    useRecommendedCaloricIntake: true, // true for calculated value
    recommendedCaloricIntake: 0, // use this if useRecommendedCaloricIntake === false
    protein: 0, // percentage
    fat: 0,
    carbohydrate: 0,
    preferredFiber: 0,
    otherNotes: '',
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleCheckBoxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="w-3/4 h-screen py-8 mx-12 flex flex-col items-center">
      <h1 className="text-3xl mb-8">Crear Perfil</h1>
      <hr className="border-slate-300 border-1 w-full" />
      <form
        className="flex flex-col w-full overflow-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        <h2 className="text-xl my-8 self-center">Datos de la Mascota</h2>
        <div className="flex justify-between mb-8">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData?.name}
              onChange={handleChange}
              autoComplete="off"
              className="border-slate-800 border-1 py-1 px-2 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">La mascota es</label>
            <select
              name="species"
              id="species"
              value={formData?.species}
              onChange={handleSelectChange}
              className="border-slate-800 border-1 py-1 px-2 rounded-md focus:outline-none"
            >
              <option value="Perro Adulto">Perro Adulto</option>
              <option value="Gato Adulto">Gato Adulto</option>
              <option value="Perro Cachorro">Perro Cachorro</option>
              <option value="Gato Cachorro">Gato Cachorro</option>
              <option value="Perra Preñada">Perra Preñada</option>
              <option value="Gata Preñada">Gata Preñada</option>
              <option value="Perra Lactancia">Perra Lactancia</option>
              <option value="Gata Lactancia">Gata Lactancia</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Peso (Kg)</label>
            <input
              type="text"
              name="weight"
              id="weight"
              value={formData?.weight}
              onChange={handleChange}
              autoComplete="off"
              className="border-slate-800 border-1 py-1 px-2 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            {formData?.species === 'Perro Cachorro' ||
            formData?.species === 'Gato Cachorro' ? (
              <label className="text-lg font-medium">Edad (Meses)</label>
            ) : (
              <label className="text-lg font-medium">Edad (Años)</label>
            )}
            <input
              type="text"
              name="age"
              id="age"
              value={formData?.age}
              onChange={handleChange}
              autoComplete="off"
              className="border-slate-800 border-1 py-1 px-2 rounded-md focus:outline-none"
            />
          </div>
        </div>
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Tiene Pelo Negro</label>
            <input
              type="checkbox"
              name="hasBlackFurr"
              id="hasBlackFurr"
              checked={formData.hasBlackFurr}
              onChange={handleCheckBoxChange}
            />
          </div>
          {(formData.species === 'Gato Adulto' ||
            formData.species === 'Gato Cachorro' ||
            formData.species === 'Gata Preñada' ||
            formData.species === 'Gata Lactancia') && (
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium">Gato con Sobrepeso</label>
              <input
                type="checkbox"
                name="isCatOverweight"
                id="isCatOverweight"
                checked={formData.isCatOverweight}
                onChange={handleCheckBoxChange}
              />
            </div>
          )}
          {(formData.species === 'Gata Lactancia' ||
            formData.species === 'Perra Preñada') && (
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium">
                Cantidad de Cachorros
              </label>
              <input
                type="text"
                name="weight"
                id="weight"
                value={formData.numCachorros}
                onChange={handleChange}
                autoComplete="off"
                className="border-slate-800 border-1 py-1 px-2 rounded-md focus:outline-none"
              />
            </div>
          )}

          {(formData.species === 'Gata Lactancia' ||
            formData.species === 'Perra Lactancia') && (
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium">Semana (Lactancia)</label>
              <select
                name="species"
                id="species"
                value={formData.lactancyWeek}
                onChange={handleSelectChange}
                className="border-slate-800 border-1 py-1 px-2 rounded-md focus:outline-none"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
