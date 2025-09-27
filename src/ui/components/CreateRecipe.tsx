import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import Page from './Page'
import Title from './Title'
import Select from './Select'
import { STANDARDS } from '../data/standards_es'
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

const INIT_TOTAL = Object.fromEntries(
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

  const requirements = selectedPet
    ? STANDARDS.recomendado[selectedPet?.species]
    : null

  async function getPets() {
    const allPets = await window.electron.getAllPets()
    setPets(allPets)
    if (allPets.length > 0) setSelectedPet(allPets[0])
  }

  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }))
    const selectedPet = pets?.find((p) => p.name === value)
    setSelectedPet(selectedPet)
  }

  useEffect(() => {
    getPets()
  }, [])

  return (
    <Page>
      <Title content="Crear Receta" />
      <div className="grid grid-cols-[1fr_2fr] gap-8 w-full h-screen">
        <div className="flex flex-col items-center my-4">
          <div className="flex flex-col gap-2">
            <Select
              label="Nombre del Animal"
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
                <td className="text-start">Energía</td>
                <td>{selectedPet.recommendedCaloricIntake} kcal</td>
                <td>0</td>
                <td>0</td>
              </tr>
              {Object.entries(requirements!)
                .filter(([_, v]) => v.cantidad !== null)
                .map(([k, v]) => (
                  <tr className="text-end">
                    <td className="text-start">{k}</td>
                    <td>
                      {v.unidad
                        ? (v.cantidad! * selectedPet?.metabolicWeight).toFixed(
                            2
                          )
                        : v.cantidad?.toFixed(2)}{' '}
                      {v.unidad}
                    </td>
                    <td>{total[k]}</td>
                    <td>{(total[k] / v.cantidad!) * 100}</td>
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
