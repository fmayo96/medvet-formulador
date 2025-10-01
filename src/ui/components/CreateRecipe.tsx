import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import Page from './Page'
import Title from './Title'
import Select from './Select'
import { STANDARDS } from '../data/standards_es'
import { FOOD_DB } from '../data/food_db'
import { MACROS } from '../data/macros'
import SmallCard from './SmallCard'

interface Food {
  name: string // --> name of the food
  amount: number // --> amount in grams
}

interface Recipe {
  petName: string
  ingredients: Food[]
  date: Date
}

type STANDARD_ENTRIES = keyof (typeof STANDARDS.recomendado)['Perro Adulto']

const INIT_TOTAL = Object.fromEntries(
  Object.keys(STANDARDS.recomendado['Perro Adulto']).map((k) => [k, 0])
)

let REQUIREMENTS = Object.fromEntries(
  Object.keys(STANDARDS.recomendado['Perro Adulto']).map((k) => [k, 0])
)

const CreateRecipe = () => {
  const [pets, setPets] = useState<PetDTO[]>()
  const [selectedPet, setSelectedPet] = useState<PetDTO>()
  const [recipe, setRecipe] = useState<Recipe>({
    petName: '',
    ingredients: [],
    date: new Date(),
  })
  const [total, setTotal] = useState(INIT_TOTAL)

  function calculateRequirements(selectedPet: PetDTO) {
    for (let key in STANDARDS.recomendado[selectedPet.species]) {
      let req =
        STANDARDS.recomendado[selectedPet.species][key as STANDARD_ENTRIES]
          .cantidad

      if (req !== null) {
        if (
          STANDARDS.recomendado[selectedPet.species][key as STANDARD_ENTRIES]
            .unidad !== null
        ) {
          REQUIREMENTS[key as STANDARD_ENTRIES] =
            req * selectedPet.metabolicWeight
        } else {
          REQUIREMENTS[key as STANDARD_ENTRIES] = req
        }
      }
    }
  }

  async function getPets() {
    const allPets = await window.electron.getAllPets()
    setPets(allPets)
    if (allPets.length > 0) setSelectedPet(allPets[0])
    calculateRequirements(allPets[0])
  }

  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }))
    const selectedPet = pets?.find((p) => p.name === value)
    if (selectedPet) {
      setSelectedPet(selectedPet)
      calculateRequirements(selectedPet)
      //@ts-expect-error
      REQUIREMENTS['Carbohidratos, por diferencia'] =
        (selectedPet.recommendedCaloricIntake * selectedPet.carbs) / 400.0
    }
  }

  useEffect(() => {
    getPets()
  }, [])

  return (
    <Page>
      <Title content="Crear receta" />
      <div className="grid grid-cols-[1fr_2fr] gap-8 w-full h-screen">
        <div className="flex flex-col items-center my-4 gap-4">
          <div className="flex flex-col gap-2">
            <Select
              label="Nombre del animal"
              name="petName"
              value={recipe.petName}
              onChange={handleSelect}
              className="overflow-y-auto"
            >
              {pets?.map((p) => (
                <option>{p.name}</option>
              ))}
            </Select>
            {selectedPet && <SmallCard pet={selectedPet} />}
          </div>
          <select
            name="food"
            id="food"
            className="w-full bg-white border-1 border-slate-800 rounded-md py-1"
          >
            {FOOD_DB.map((f) => (
              <option className="w-12">{f['Item Name']}</option>
            ))}
          </select>
        </div>

        <div
          className="overflow-y-auto border-l-2 border-slate-200 px-4 flex justify-center mb-32"
          //style={{ scrollbarWidth: 'none' }}
          style={{ scrollbarColor: 'red' }}
        >
          {selectedPet && (
            <table className="w-full table-auto my-4 mx-4 h-full">
              <thead className="text-end">
                <tr>
                  <th className="text-start">Macros</th>
                  <th>Objetivo</th>
                  <th>Total</th>
                  <th>% del Objetivo</th>
                </tr>
              </thead>
              <tr className="text-end">
                <td className="text-start">Energía kcal</td>
                <td>{selectedPet.recommendedCaloricIntake} </td>
                <td>0</td>
                <td>0</td>
              </tr>
              {MACROS.map((m) => (
                <tr className="text-end h-4">
                  <td className={`text-start ${m.bold && 'font-bold'}`}>
                    {m.mostrar ? m.mostrar : m.nombre} {m.unidad && m.unidad}
                  </td>
                  <td>
                    {REQUIREMENTS[m.nombre]
                      ? REQUIREMENTS[m.nombre].toFixed(2)
                      : ' '}
                  </td>
                  <td>{m.nombre === ' ' ? ' ' : 0}</td>
                  <td>{m.nombre === ' ' ? ' ' : 0}</td>
                </tr>
              ))}
            </table>
          )}
        </div>
      </div>
    </Page>
  )
}
export default CreateRecipe
