import React, { useState } from 'react'
import Input from './Input'

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
  estimatedEnergyFactor: number
  isIdealWeight: boolean
  idealWeight: number
  useRecommendedCaloricIntake: boolean // true for calculated value
  recommendedCaloricIntake: number // use this if useRecommendedCaloricIntake === false
  customCaloricIntake: number
  protein: number // percentage
  fat: number // percentage
  carbohydrate: number // percentage
  preferredFiber: number //percentage
  otherNotes: string
}

const reGato = /Gat/
const reLact = /Lactancia/
const reCachorro = /Cachorro/

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
    customCaloricIntake: 0,
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
    <div className="w-3/4 h-screen py-8 px-12 flex flex-col items-center">
      <h1 className="text-3xl mb-8">Crear Perfil</h1>
      <hr className="border-slate-300 border-1 w-full" />
      <form
        className="flex flex-col w-full overflow-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        <h2 className="text-xl my-8 self-center font-medium">
          Datos del Animal
        </h2>
        <div className="grid grid-cols-4 gap-8 mb-8">
          <Input
            label="Nombre"
            name="Nombre"
            value={formData.name}
            onChange={handleChange}
          ></Input>
          <div className="flex flex-col gap-1">
            <label className="text-lg">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
              className="border-slate-800 border-1 py-1 px-2 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg ">El animal es</label>
            <select
              name="species"
              id="species"
              value={formData.species}
              onChange={handleSelectChange}
              className="border-slate-800 border-1 py-1.5  px-2 rounded-md focus:outline-none"
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
          <div className="flex flex-col gap-1">
            <label className="text-lg">Peso (Kg)</label>
            <input
              type="text"
              name="weight"
              id="weight"
              value={formData.weight}
              onChange={handleChange}
              autoComplete="off"
              className="border-slate-800 border-1 py-1 px-2 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            {reCachorro.test(formData.species) ? (
              <label className="text-lg">Edad (Meses)</label>
            ) : (
              <label className="text-lg">Edad (Años)</label>
            )}
            <input
              type="text"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
              autoComplete="off"
              className="border-slate-800 border-1 py-1 px-2 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex flex-col items-center gap-1 mb-4">
            <label className="text-lg">Tiene Pelo Negro</label>
            <input
              type="checkbox"
              name="hasBlackFurr"
              id="hasBlackFurr"
              checked={formData.hasBlackFurr}
              onChange={handleCheckBoxChange}
              className="w-5 h-5 accent-purple-500"
            />
          </div>
          {reGato.test(formData.species) && (
            <div className="flex flex-col items-center gap-1 mb-4">
              <label className="text-lg">Gato con Sobrepeso</label>
              <input
                type="checkbox"
                name="isCatOverweight"
                id="isCatOverweight"
                checked={formData.isCatOverweight}
                onChange={handleCheckBoxChange}
                className="w-5 h-5 accent-purple-500"
              />
            </div>
          )}
          {reLact.test(formData.species) ? (
            <div className="flex flex-col gap-1">
              <label className="text-lg">Cantidad de Cachorros</label>
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
          ) : (
            <p></p>
          )}

          {reLact.test(formData.species) ? (
            <div className="flex flex-col gap-1">
              <label className="text-lg">Semana (Lactancia)</label>
              <select
                name="species"
                id="species"
                value={formData.lactancyWeek}
                onChange={handleSelectChange}
                className="border-slate-800 border-1 py-1.5 px-2 rounded-md focus:outline-none"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>
          ) : (
            <p></p>
          )}
        </div>
        <h2 className="text-xl mt-4 mb-8 self-center font-medium">
          Requerimientos Energéticos
        </h2>
        <div className="grid grid-cols-[2fr_1fr] gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-lg">Factor de Energía Estimado</label>
              <input
                type="text"
                name="estimatedEnergyFactor"
                id="estimatedEnergyFactor"
                value={formData.estimatedEnergyFactor}
                onChange={handleChange}
                autoComplete="off"
                className="border-slate-800 border-1 py-1 px-2 rounded-md focus:outline-none"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <label className="text-lg">Está en su Peso Ideal?</label>
              <input
                type="checkbox"
                name="isIdealWeight"
                id="isIdealWeight"
                checked={formData.isIdealWeight}
                onChange={handleCheckBoxChange}
                className="w-5 h-5 accent-purple-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg">Peso Ideal (Kg)</label>
              <input
                type="text"
                name="idealWeight"
                id="idealWeight"
                value={formData.idealWeight}
                onChange={handleChange}
                autoComplete="off"
                className="border-slate-800 border-1 py-1 px-2 rounded-md focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg">
                Ingesta Calórica Recomendada (Kcal)
              </label>
              <p className="border-1 border-slate-800 py-1 px-2 rounded-md bg-slate-200">
                {formData.recommendedCaloricIntake}
              </p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <label className="text-lg">
                Usar Ingesta Calórica Recomendada?
              </label>
              <input
                type="checkbox"
                name="useRecommendedCaloricIntake"
                id="useRecommendedCaloricIntake"
                checked={formData.useRecommendedCaloricIntake}
                onChange={handleCheckBoxChange}
                className="w-5 h-5 accent-purple-500"
              />
            </div>
            {!formData.useRecommendedCaloricIntake && (
              <div className="flex flex-col gap-1">
                <label className="text-lg">Ingesta Calórica</label>
                <input
                  type="text"
                  name="customCaloricIntake"
                  id="customCaloricIntake"
                  value={formData.customCaloricIntake}
                  onChange={handleChange}
                  autoComplete="off"
                  className="border-slate-800 border-1 py-1 px-2 rounded-md focus:outline-none"
                />
              </div>
            )}
          </div>
          {reGato.test(formData.species) ? (
            <div className="flex flex-col gap-2 bg-purple-200 border-1 border-purple-700 rounded-md p-4 mt-4">
              <h3 className="font-medium text-purple-700">
                Factor de Energía Estimado: Gatos
              </h3>
              <p className="text-purple-700 text-sm">
                Ingresar el factor de energía estimado para mantener el peso, no
                para subir o bajar.
              </p>
              <p className="text-purple-700 text-sm">
                {'<'}55: Sedentario. Si tiene sobrepeso marcar la checkbox
                arriba.
              </p>
              <p className="text-purple-700 text-sm">
                55-70: Gatos de hogar, parcialmente sedentarios con explosiónes
                breves de energía.
              </p>
              <p className="text-purple-700 text-sm">
                70 - 100: Gatos de hogar activos. Gatos jóvenes y razas
                exóticas.
              </p>
              <p className="text-purple-700 text-sm">
                {'>'}100: Gatos muy activos o razas exóticas. Usualmente los
                gatos de exterior o de granero.
              </p>
              <p className="text-purple-700 text-sm">
                La mayoría de los gatos adultos están en 55-80. Excepciones:
                gatos jóvenes o de razas exóticas.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 bg-purple-200 border-1 border-purple-700 rounded-md p-4 mt-4">
              <h3 className="font-medium text-purple-700">
                Factor de Energía Estimado: Perros
              </h3>
              <p className="text-purple-700 text-sm">
                Ingresar el factor de energía estimado para mantener el peso, no
                para subir o bajar.
              </p>
              <p className="text-purple-700 text-sm">
                {'<'}80: Sedentario. Pueden ser también perros mayores o perros
                activos con metabolismo bajo.
              </p>
              <p className="text-purple-700 text-sm">
                80-95: Mascota normal de hogar. Típicamente perros de mediana
                edad. activos con metabolismo bajo.
              </p>
              <p className="text-purple-700 text-sm">
                95-110: Perros con estilo de vida activo (hiking, deportes, vida
                en granja) o jóvenes.
              </p>
              <p className="text-purple-700 text-sm">
                110-130: Perros de trabajo y adultos jóvenes, especialmente si
                on están castrados.
              </p>
              <p className="text-purple-700 text-sm">
                {' '}
                {'>'}130: Perros muy activos (trabajo o deporte en ambientes
                fríos). No muy común.
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
