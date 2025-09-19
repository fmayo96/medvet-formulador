import { useEffect, useState } from "react"
import type { ChangeEvent } from "react"
import Page from "./Page"
import Title from "./Title"
import Select from "./Select"
import { STANDARDS } from "../data/standards"
import Card from "./Card"

interface Food {
  name: string // --> name of the food
  amount: number // --> amount in grams
}

interface Recipe {
  petName: string
  ingredients: Food[]
  date: Date
}

const CreateRecipe = () => {
  const [pets, setPets] = useState<PetInfo[]>()
  const [selectedPet, setSelectedPet] = useState<PetInfo>()
  const [recipe, setRecipe] = useState<Recipe>({
    petName: "",
    ingredients: [],
    date: new Date(),
  })
  async function getPets() {
    const allPets = await window.electron.getAllPets()
    setPets(allPets)
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
  }, [pets])

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
            >
              {pets?.map((p) => (
                <option>{p.name}</option>
              ))}
            </Select>
            {selectedPet && <Card pet={selectedPet} />}
          </div>
        </div>

        <div
          className="overflow-y-auto border-l-2 border-slate-200 px-4"
          style={{ scrollbarWidth: "none" }}
        >
          <h2 className="text-2xl  my-4">Requerimientos</h2>
          <div className="">
            {selectedPet &&
              Object.entries(STANDARDS.recommended[selectedPet!.species]).map(
                ([k, v]) => <p>{`${k} ${v}`}</p>
              )}
          </div>
        </div>
      </div>
    </Page>
  )
}
export default CreateRecipe
